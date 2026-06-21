package io.argus

import org.springframework.boot.fromApplication
import org.springframework.boot.with


fun main(args: Array<String>) {
	fromApplication<ArgusApplication>().with(TestcontainersConfiguration::class).run(*args)
}
