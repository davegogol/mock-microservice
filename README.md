# mock-microservice

This repo contains a Node.js application which can be used to mock some REST APIs service with the appropriate configuration.
It can be used in the microservice mocking strategy for the contract test.

Here the list of the features supported.

## HTTP Request

Methods supported: 

* GET (query parameters, headers)
* POST (application/json body, application/x-www-form-urlencoded body parameters, headers)
* PUT (application/json body, application/x-www-form-urlencoded body parameters, headers)

Not supported yet: 
* URI template (i.e. /user/{userId} )
* POST (application/xml, multi-part/formdata and other content types body)
* PUT (application/xml, multi-part/formdata and other content types body)
* DELETE 

## HTTP Response

* status code
* application/json body, text/plain body

Not supported yet: 

* application/xml body

This application is under development, for the missing features. 

## Testing

For testing purposes the application has the following configuration.

#####Endpoints.json configuration

```json
{
  "1": {
  "path": "/monitoring",
  "method": "GET"
  }
}
```
#####HTTPRequestResponsePairs.json configuration

```json
{
  "1" :
  {
    "request": {
      "endpoint": "/monitoring",
      "method": "GET"
    },
    "response": {
      "content": "Alive",
      "code": "200"
    }
  }
}
```

```bash
curl -X GET http://localhost:8081/monitoring
```


