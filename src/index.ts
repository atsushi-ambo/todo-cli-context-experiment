#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ListToolsRequestSchema,
    ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";

// Todo item interface
interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  priority: "low" | "medium" | "high";
}

class TodoServer {
  private server: Server;
  private todoFile: string;

  constructor() {
    this.server = new Server(
      {
        name: "todo-cli-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.todoFile = path.join(process.cwd(), "todos.json");
    this.setupHandlers();
  }

  private async loadTodos(): Promise<TodoItem[]> {
    try {
      const data = await fs.readFile(this.todoFile, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Return empty array if file doesn't exist
      return [];
    }
  }

  private async saveTodos(todos: TodoItem[]): Promise<void> {
    await fs.writeFile(this.todoFile, JSON.stringify(todos, null, 2));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private setupHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: "todo://list",
            name: "Todo List",
            description: "Current todo items",
            mimeType: "application/json",
          },
        ],
      };
    });

    // Read resource content
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      if (request.params.uri === "todo://list") {
        const todos = await this.loadTodos();
        return {
          contents: [
            {
              uri: request.params.uri,
              mimeType: "application/json",
              text: JSON.stringify(todos, null, 2),
            },
          ],
        };
      }
      throw new Error(`Unknown resource: ${request.params.uri}`);
    });

    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "add_todo",
            description: "Add a new todo item",
            inputSchema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the todo item",
                },
                description: {
                  type: "string",
                  description: "Optional description of the todo item",
                },
                priority: {
                  type: "string",
                  enum: ["low", "medium", "high"],
                  description: "Priority level of the todo item",
                  default: "medium",
                },
              },
              required: ["title"],
            },
          },
          {
            name: "list_todos",
            description: "List all todo items",
            inputSchema: {
              type: "object",
              properties: {
                filter: {
                  type: "string",
                  enum: ["all", "completed", "pending"],
                  description: "Filter todos by completion status",
                  default: "all",
                },
              },
            },
          },
          {
            name: "complete_todo",
            description: "Mark a todo item as completed",
            inputSchema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "ID of the todo item to complete",
                },
              },
              required: ["id"],
            },
          },
          {
            name: "delete_todo",
            description: "Delete a todo item",
            inputSchema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "ID of the todo item to delete",
                },
              },
              required: ["id"],
            },
          },
          {
            name: "update_todo",
            description: "Update a todo item",
            inputSchema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "ID of the todo item to update",
                },
                title: {
                  type: "string",
                  description: "New title for the todo item",
                },
                description: {
                  type: "string",
                  description: "New description for the todo item",
                },
                priority: {
                  type: "string",
                  enum: ["low", "medium", "high"],
                  description: "New priority level",
                },
              },
              required: ["id"],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "add_todo":
          return await this.addTodo(args as any);
        case "list_todos":
          return await this.listTodos(args as any);
        case "complete_todo":
          return await this.completeTodo(args as any);
        case "delete_todo":
          return await this.deleteTodo(args as any);
        case "update_todo":
          return await this.updateTodo(args as any);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async addTodo(args: {
    title: string;
    description?: string;
    priority?: "low" | "medium" | "high";
  }) {
    const todos = await this.loadTodos();
    const newTodo: TodoItem = {
      id: this.generateId(),
      title: args.title,
      description: args.description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: args.priority || "medium",
    };

    todos.push(newTodo);
    await this.saveTodos(todos);

    return {
      content: [
        {
          type: "text",
          text: `Added todo: ${newTodo.title} (ID: ${newTodo.id})`,
        },
      ],
    };
  }

  private async listTodos(args: { filter?: "all" | "completed" | "pending" }) {
    const todos = await this.loadTodos();
    const filter = args.filter || "all";

    let filteredTodos = todos;
    if (filter === "completed") {
      filteredTodos = todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      filteredTodos = todos.filter((todo) => !todo.completed);
    }

    const todoList = filteredTodos
      .map((todo) => {
        const status = todo.completed ? "✅" : "❌";
        const priority = todo.priority === "high" ? "🔴" : todo.priority === "medium" ? "🟡" : "🟢";
        return `${status} ${priority} [${todo.id}] ${todo.title}${
          todo.description ? ` - ${todo.description}` : ""
        }`;
      })
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: filteredTodos.length > 0 ? todoList : "No todos found.",
        },
      ],
    };
  }

  private async completeTodo(args: { id: string }) {
    const todos = await this.loadTodos();
    const todo = todos.find((t) => t.id === args.id);

    if (!todo) {
      return {
        content: [
          {
            type: "text",
            text: `Todo with ID ${args.id} not found.`,
          },
        ],
      };
    }

    todo.completed = true;
    todo.updatedAt = new Date().toISOString();
    await this.saveTodos(todos);

    return {
      content: [
        {
          type: "text",
          text: `Completed todo: ${todo.title}`,
        },
      ],
    };
  }

  private async deleteTodo(args: { id: string }) {
    const todos = await this.loadTodos();
    const todoIndex = todos.findIndex((t) => t.id === args.id);

    if (todoIndex === -1) {
      return {
        content: [
          {
            type: "text",
            text: `Todo with ID ${args.id} not found.`,
          },
        ],
      };
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    await this.saveTodos(todos);

    return {
      content: [
        {
          type: "text",
          text: `Deleted todo: ${deletedTodo.title}`,
        },
      ],
    };
  }

  private async updateTodo(args: {
    id: string;
    title?: string;
    description?: string;
    priority?: "low" | "medium" | "high";
  }) {
    const todos = await this.loadTodos();
    const todo = todos.find((t) => t.id === args.id);

    if (!todo) {
      return {
        content: [
          {
            type: "text",
            text: `Todo with ID ${args.id} not found.`,
          },
        ],
      };
    }

    if (args.title) todo.title = args.title;
    if (args.description !== undefined) todo.description = args.description;
    if (args.priority) todo.priority = args.priority;
    todo.updatedAt = new Date().toISOString();

    await this.saveTodos(todos);

    return {
      content: [
        {
          type: "text",
          text: `Updated todo: ${todo.title}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Todo MCP Server running on stdio");
  }
}

// Run the server
const server = new TodoServer();
server.run().catch(console.error);
