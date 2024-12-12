
// src/interfaces/BlogPost.ts
export interface BlogPost {
  id?: number | string
  title: string
  body: string
  userId?: number
  tags?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface BlogPostInput {
  title: string
  body: string
  tags?: string[]
}
