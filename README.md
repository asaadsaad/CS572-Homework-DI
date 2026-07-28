### CS572 - Dependency Injection
### Exercise
1. Refactor the code from the last assignment, making sure you handle `loading`, and `error` states: 
   * Use the `HttpClient` service and consume the observable in two ways:
       1. with `.subscribe()` 
       2. with `AsyncPipe` in the template
   * Use the `httpResponse` API
2. Use the `Title` service within an `effect` to change the page title to the current recipe's title.
