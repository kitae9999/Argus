package io.argus

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ArgusApplication

fun main(args: Array<String>) {
	runApplication<ArgusApplication>(*args)
}
