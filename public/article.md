# Spring Boot with Gradle

This guide provides a step-by-step approach, so you can master the art of creating a Spring Boot project with
Gradle using just the command line — and later bring it to life in IntelliJ IDEA.

## Prerequisites

To follow this guide, ensure you have the following installed and configured on your system:

1. Java Development Kit (JDK) :</b> Java 8 or higher (preferably Java 11 or 17)

   Verify installation by running `java -version`

2. Gradle

   Verify installation by running `gradle -v`

3. IntelliJ IDEA
4. Command Line Tool

## Setup Project Structure

- Open Terminal or Command prompt and navigate to the directory where you want to create the project

        cd ~/Documents/Workspace/EducateWorkspace

- Create a new directory for you project and switch to the newly created directory

        mkdir tspark-springboot-gradle

        cd tspark-springboot-gradle

## Initialize the Gradle Project

Generate the project structure using Gradle’s `init` command:

        gradle init

Follow these prompts during initialization:

- **Select type of project:** Application
- **Select implementation language:** Java
- **Enter target Java version (min: 7, default: 21):** 17
- **Project name:** tspark-springboot-gradle
- **Select application structure:** Single application project
- **Select build script DSL:** Groovy
- **Select test framework:** JUnit4

Generate a Gradle wrapper:

    gradle wrapper

This creates a `gradlew` script for Linux/Mac and `gradlew.bat` for Windows, along with the `gradle/wrapper` directory containing wrapper files.

Your project directory should look like this:

![Spring Boot Project Directory](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*UCW50sWRorDfIdrXLWzJpA.png "Project Directory")

## Opening the Project in IntelliJ IDEA or VS Code

Now is the perfect time to open the project in the IDE of your choice. You can launch your IDE and manually browse to open the project directory, or simply run the following command from the project folder for convenience

        open -na "IntelliJ IDEA CE.app" .   #For opening in Intellij

        code .   #For opening in vscode

_Note:_ Ensure your IDE is added to your system’s PATH for these commands to work.

## Update the `build.gradle` File

Open the build.gradle file in your IDE and modify it to include Spring Boot dependencies and plugins

```groovy
plugins {
  id 'org.springframework.boot' version '3.1.4'
  id 'io.spring.dependency-management' version '1.1.3'
  id 'java'
}

group = 'org.techspark'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-web-test'
}
```

## Main Application Class

The main application class in a Spring Boot project serves as the entry point for the application. It contains the main method, which starts the Spring Boot application and initializes its runtime environment.

- Create a package of your choice under the `src\main\java` folder. (eg: `org.techspark`)
- Under the newly created package create a new java class file `Application.java` with below content

```java
package org.techspark;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

- Lets add a simple controller under the same package `GreetingController.java`

```java
package org.techspark;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class GreetingController {
    @GetMapping("/")
    public String greeting() {
        return "Greeting from TechSpark";
    }
}
```

## Run The Application

Run the application from the IDE or using gradle command `./gradlew bootRun`

Open a browser or use curl to visit the default endpoint:

```shell
curl http://localhost:8080
```

You would see the below message

```shell
Greeting from TechSpark
```

I hope this article has refreshed your skills or introduced you to a few new tricks for building Spring Boot projects with Gradle from scratch. Whether you’re a seasoned developer or just starting with Spring Boot, taking the time to create a project manually helps deepen your understanding and gives you greater control over your setup.

To streamline your future projects, I recommend creating a skeleton repository with all the basic configurations and dependencies you frequently use. This will save you time and effort when starting new services.

You can find the final code at : 👉 [My Spring Boot Skeleton Repository](https://github.com/TechSparkWorkspace/tspark-springboot-gradle.git)
