---
title: "Microservices Best Practices I Learned at Tokopedia"
date: "2023-11-20"
excerpt: "Key lessons and patterns from building microservices at scale in one of Indonesia's largest tech companies."
tags: ["Microservices", "Architecture", "Go", "gRPC"]
readTime: "12 min read"
image: "/images/blog/microservices.png"
---

# Microservices Best Practices I Learned at Tokopedia

During my time at Tokopedia, I had the privilege of working on systems that handle millions of requests daily. Here are the key lessons I learned about building and maintaining microservices at scale.

## 1. Design for Failure

In a distributed system, failures are inevitable. Design your services to handle them gracefully.

### Circuit Breaker Pattern

Implement circuit breakers to prevent cascading failures:

```go
type CircuitBreaker struct {
    failures    int
    threshold   int
    state       State
    lastFailure time.Time
    timeout     time.Duration
}

func (cb *CircuitBreaker) Call(fn func() error) error {
    if cb.state == Open {
        if time.Since(cb.lastFailure) > cb.timeout {
            cb.state = HalfOpen
        } else {
            return ErrCircuitOpen
        }
    }

    err := fn()
    if err != nil {
        cb.recordFailure()
        return err
    }

    cb.reset()
    return nil
}
```

### Retry with Exponential Backoff

```go
func RetryWithBackoff(fn func() error, maxRetries int) error {
    var err error
    for i := 0; i < maxRetries; i++ {
        err = fn()
        if err == nil {
            return nil
        }

        backoff := time.Duration(math.Pow(2, float64(i))) * time.Second
        time.Sleep(backoff)
    }
    return err
}
```

## 2. Observability is Critical

You can't fix what you can't see. Implement the three pillars of observability:

### Logging

Use structured logging with consistent fields:

```go
log.WithFields(log.Fields{
    "request_id": ctx.Value("request_id"),
    "user_id":    userID,
    "action":     "create_order",
    "latency_ms": latency.Milliseconds(),
}).Info("Order created successfully")
```

### Metrics

Track key metrics for each service:

- **Request rate** - Requests per second
- **Error rate** - Percentage of failed requests
- **Latency** - P50, P95, P99 response times
- **Saturation** - CPU, memory, connection pool usage

### Distributed Tracing

Implement tracing to follow requests across services:

```go
span, ctx := opentracing.StartSpanFromContext(ctx, "processOrder")
defer span.Finish()

span.SetTag("order_id", orderID)
span.LogFields(log.String("event", "processing"))
```

## 3. API Design Matters

### Use gRPC for Internal Communication

gRPC provides:
- Strong typing with Protocol Buffers
- Efficient binary serialization
- Built-in streaming support
- Automatic code generation

```protobuf
service OrderService {
    rpc CreateOrder(CreateOrderRequest) returns (Order);
    rpc GetOrder(GetOrderRequest) returns (Order);
    rpc ListOrders(ListOrdersRequest) returns (stream Order);
}
```

### REST for External APIs

For public-facing APIs, REST with clear versioning:

```
GET /api/v1/orders/{id}
POST /api/v1/orders
```

## 4. Database Per Service

Each microservice should own its data:

- **Autonomy** - Services can choose the best database for their needs
- **Isolation** - Schema changes don't affect other services
- **Scalability** - Each database can scale independently

### Handling Cross-Service Data

Use the Saga pattern for distributed transactions:

```go
type OrderSaga struct {
    steps []SagaStep
}

func (s *OrderSaga) Execute(ctx context.Context) error {
    var completedSteps []SagaStep

    for _, step := range s.steps {
        if err := step.Execute(ctx); err != nil {
            // Compensate in reverse order
            for i := len(completedSteps) - 1; i >= 0; i-- {
                completedSteps[i].Compensate(ctx)
            }
            return err
        }
        completedSteps = append(completedSteps, step)
    }

    return nil
}
```

## 5. Message Queues for Async Communication

Use message queues (NSQ, Kafka, RabbitMQ) for:

- **Decoupling** - Services don't need to know about each other
- **Resilience** - Messages persist if consumers are down
- **Scalability** - Add consumers as needed

```go
func (c *Consumer) HandleMessage(msg *nsq.Message) error {
    var event OrderCreatedEvent
    if err := json.Unmarshal(msg.Body, &event); err != nil {
        return err
    }

    // Process the event
    return c.processOrderCreated(event)
}
```

## Key Takeaways

1. **Design for failure** - Implement circuit breakers, retries, and timeouts
2. **Invest in observability** - Logging, metrics, and tracing from day one
3. **Choose the right communication pattern** - gRPC internally, REST externally
4. **Own your data** - Database per service with saga patterns for transactions
5. **Embrace async** - Use message queues for non-blocking operations

Building microservices at scale is challenging, but these patterns have served us well at Tokopedia. Start small, iterate quickly, and always keep reliability in mind.

---

*Have questions about microservices? Feel free to reach out on [X](https://x.com/aliirsyaadn) or [LinkedIn](https://linkedin.com/in/aliirsyaadn).*
