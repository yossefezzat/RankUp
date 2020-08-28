### Why Microservices?

It allows all services to communicate with each other even when the services live on different machines. This then allows new functionality to be implemented in the services.

As each service is hosted on a separate process, if a service becomes the bottleneck and is resource hungry then it can be moved out into another machine without impacting other services.

When more users start to use a feature of an application, the service can be scaled up by deploying into a powerful machine or by introducing caching without impacting all of the other services.

TIt also increases the reliability of the application as each service can be built, tested, deployed and used independently.

It also eliminates a single point of failure as a service can go down without impacting all features that the software application offers.

Code re-usability is further encouraged because a feature is hosted as a service and it allows multiple services to consume the same feature instead of implementing the same code twice.



### Microservices vs Monolithic

![Microservices vs Monolithic](comparsion.jpg)

