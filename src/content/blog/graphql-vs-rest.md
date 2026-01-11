---
title: "GraphQL vs REST: When to Use What"
date: "2023-09-05"
excerpt: "A practical comparison of GraphQL and REST APIs based on real-world experience."
tags: ["GraphQL", "REST", "API Design"]
readTime: "10 min read"
image: "/images/blog/graphql-rest.png"
---

# GraphQL vs REST: When to Use What

Having built both GraphQL and REST APIs in production, I've learned that the choice isn't about which is "better" – it's about which fits your use case. Let me share my experience.

## Understanding the Fundamentals

### REST: Resource-Based

REST organizes APIs around resources with standard HTTP methods:

```bash
GET    /api/users          # List users
GET    /api/users/123      # Get user
POST   /api/users          # Create user
PUT    /api/users/123      # Update user
DELETE /api/users/123      # Delete user
```

### GraphQL: Query-Based

GraphQL uses a single endpoint with typed queries:

```graphql
query {
  user(id: "123") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}
```

## When to Choose REST

### 1. Simple CRUD Operations

For straightforward create, read, update, delete operations, REST's simplicity shines:

```go
// Clean and predictable
func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    user, err := h.userService.GetByID(r.Context(), id)
    if err != nil {
        respondError(w, err)
        return
    }
    respondJSON(w, user)
}
```

### 2. Caching is Critical

REST's URL-based resources work perfectly with HTTP caching:

```go
w.Header().Set("Cache-Control", "public, max-age=3600")
w.Header().Set("ETag", calculateETag(resource))
```

### 3. Third-Party Consumers

When building public APIs for external developers, REST's familiarity and documentation tools (OpenAPI/Swagger) make integration easier.

## When to Choose GraphQL

### 1. Complex, Nested Data

When clients need related data in a single request:

```graphql
query GetOrderDetails {
  order(id: "456") {
    id
    status
    customer {
      name
      email
    }
    items {
      product {
        name
        price
      }
      quantity
    }
    shipping {
      address
      estimatedDelivery
    }
  }
}
```

With REST, this would require multiple endpoints or over-fetching.

### 2. Mobile Applications

Mobile apps benefit from:
- **Reduced bandwidth** - Request only needed fields
- **Fewer round trips** - Get all data in one request
- **Flexible queries** - Different screens, different data needs

### 3. Rapid Frontend Iteration

When the frontend team needs to move fast without backend changes:

```graphql
# Week 1: Just need basic info
query { user { name email } }

# Week 2: Now need profile too
query { user { name email profile { bio avatar } } }

# No backend changes required!
```

## Real-World Comparison

Here's a practical example from my experience:

### The REST Approach

```bash
# Get user profile page data
GET /api/users/123                    # 200ms
GET /api/users/123/posts?limit=5      # 150ms
GET /api/users/123/followers/count    # 100ms
# Total: 3 requests, ~450ms
```

### The GraphQL Approach

```graphql
query UserProfile {
  user(id: "123") {
    name
    bio
    avatar
    posts(limit: 5) {
      title
      excerpt
    }
    followersCount
  }
}
# Total: 1 request, ~200ms
```

## Hybrid Approach

In many systems, you don't have to choose one or the other:

```
/api/v1/*        # REST for simple CRUD
/graphql         # GraphQL for complex queries
```

This is the approach we used at SayaKaya:

```go
func main() {
    router := chi.NewRouter()

    // REST endpoints
    router.Route("/api/v1", func(r chi.Router) {
        r.Mount("/users", userRoutes())
        r.Mount("/auth", authRoutes())
    })

    // GraphQL endpoint
    router.Handle("/graphql", graphqlHandler())

    http.ListenAndServe(":8080", router)
}
```

## Performance Considerations

### REST Performance Tips

```go
// Use field selection
GET /api/users?fields=id,name,email

// Implement pagination
GET /api/users?page=1&limit=20

// Add caching headers
Cache-Control: public, max-age=300
```

### GraphQL Performance Tips

```go
// Implement DataLoader to batch requests
loader := dataloader.NewBatchedLoader(batchFn)

// Add query complexity limits
complexity := graphql.NewComplexityLimit(100)

// Use persisted queries
query := persistedQueries[queryHash]
```

## My Recommendation

| Use Case | Recommendation |
|----------|----------------|
| Public API | REST |
| Mobile app backend | GraphQL |
| Simple CRUD | REST |
| Complex data requirements | GraphQL |
| Heavy caching needs | REST |
| Rapid iteration | GraphQL |
| Microservices internal | gRPC |

## Conclusion

Both GraphQL and REST are powerful tools. The key is understanding your requirements:

- **Choose REST** for simplicity, caching, and public APIs
- **Choose GraphQL** for flexibility, complex queries, and mobile apps
- **Consider both** for different parts of your system

Don't let hype drive your decision. Evaluate based on your specific needs, team expertise, and project constraints.

---

*What's your experience with GraphQL vs REST? Share your thoughts!*
