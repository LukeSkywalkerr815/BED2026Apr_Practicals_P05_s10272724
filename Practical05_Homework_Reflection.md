# Practical05 Homework Reflection

**1. Separation of Concerns:**

**In your own words, explain the distinct responsibilities of the Model, View (the external frontend), and Controller in your final project structure.**

Model: Houses the pure data logic, schema structures, and interaction processes targeting Microsoft SQL Server. It remains oblivious to HTTP frameworks, endpoints, or clients.

View: Comprises the standalone, engine-neutral user application files (HTML, CSS, Browser JS). It focuses entirely on processing DOM behaviors and executing network network dispatches.

Controller: Operates as the orchestrating mediator. It accepts network requests from incoming router paths, coordinates execution calls against the target Model layer, checks context operations, and sends formatted data back to the View.

**How does having a separate frontend View (Practical 05) simplify the responsibilities of your backend API?**

Introducing a clean frontend client relieves our server layer from rendering or structural page management. The API's sole function shifts to listening for requests and responding with crisp JSON data payloads, keeping the backend highly organized, performant, and maintainable.

**2. Robustness and Security:**

**Consider the journey from a simple API (Practical 03) to a more robust one (Practical 04) and a full-stack application (Practical 05). At which stage do you think it became easier to identify and fix bugs related to data handling or API responses? Why?**

Identifying and tracking tracking software anomalies became vastly simplified inside **Practical 04 (MVC Refactoring)**. Inside Practical 03, isolating a faulty process meant scanning structural errors hidden deep inside busy code where connection logic, parameters, query execution, and endpoint routing were combined. Once broken down cleanly by explicit single responsibilities into Models, Controllers, and Validation Middlewares, we could immediately isolate structural pipeline errors without parsing multiple layered responsibilities at once.

**3. Challenges and Problem Solving:**

**What was the most challenging aspect for you across Practical 03, 04, and 05? Describe the problem and how you approached solving it.**

The most challenging aspect is coordinating cross-origin asynchronous communications while properly addressing error code statuses dynamically in client-side runtime script assets. I systematically monitored tracking indicators using the browser developer engine's Network inspector, tracking header objects, request configurations, and returned body parameters until structural schemas matched seamlessly.

**Thinking critically, if you had to add a new feature (e.g., adding a "genre" field to books, or implementing user authentication), how would the current MVC structure with a separate View layer help you approach this task in a more organized and efficient way compared to the initial Practical 03 structure?**

Integrating a configuration fields enhancement (such as a "genre" field) across an MVC architecture is exceptionally straightforward. Instead of rewriting an entire script file like Practical 03, we update the domain boundaries step-by-step: adjust the structural layout definition inside the Model query schema, alter the validation checking criteria inside our validation layer, modify the corresponding controller parameters, and map out the presentation structure inside our isolated HTML frontend. This prevents unrelated software features from collapsing when updates occur.

**4. Experiential Learning: How did the hands-on coding and refactoring in these practicals help you understand the concepts of MVC, validation, error handling, and parameterized queries compared to just reading about them?**

Manually typing, refactoring, and debugging raw data code blocks provided concrete understanding that reading documentation simply cannot offer. Seeing a live Joi intercept block throw a clear `400 Bad Request` back to a browser runtime element, or watching SQL parameters completely neutralize potential injection errors in the database execution logs, made abstract backend principles clear and visible.
