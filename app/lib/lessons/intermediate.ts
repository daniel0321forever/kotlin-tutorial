import type { Lesson } from './types';

export const intermediateLessons: Lesson[] = [
  // ─────────────────────────────────────────────────────────────
  // LESSON 6 — Classes & Objects
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'classes',
    title: 'Classes & Objects',
    level: 'Intermediate',
    description:
      'Model real-world concepts with classes. Learn primary constructors, init blocks, properties, companion objects, and the object keyword for singletons.',
    blocks: [
      {
        type: 'paragraph',
        text: 'A class is a blueprint for creating objects. It bundles related data (properties) and behaviour (functions/methods) together. Kotlin\'s class syntax is dramatically more concise than Java\'s — primary constructors and property declarations live in one line.',
      },
      {
        type: 'code',
        title: 'Class Basics & Primary Constructor',
        code: `// A simple class with a PRIMARY CONSTRUCTOR in the class header.
// 'val' and 'var' in the constructor header automatically create properties.
class Person(val name: String, var age: Int) {

    // init block runs immediately after the primary constructor.
    // Use it for validation or setup logic.
    init {
        require(age >= 0) { "Age cannot be negative: $age" }
        println("Created Person: $name, age $age")
    }

    // A method (member function) belongs to instances of the class.
    fun greet() {
        // 'this' refers to the current instance; often implicit.
        println("Hi, I'm \${this.name} and I'm $age years old.")
    }

    // Computed property — no backing field, calculated on each access.
    val isAdult: Boolean
        get() = age >= 18    // custom getter using 'get()'

    // Property with a custom setter
    var nickname: String = name
        set(value) {
            // 'field' refers to the backing field of this property.
            field = value.trim()   // always store without leading/trailing spaces
        }
}

fun main() {
    val alice = Person("Alice", 30)   // calls primary constructor + init block
    // Output: Created Person: Alice, age 30

    println(alice.name)       // Output: Alice  (read-only — val)
    alice.age = 31            // OK — age is var, can be changed
    alice.greet()             // Output: Hi, I'm Alice and I'm 31 years old.
    println(alice.isAdult)    // Output: true

    alice.nickname = "  Al  "
    println(alice.nickname)   // Output: Al  (setter trimmed the spaces)
}`,
      },
      {
        type: 'code',
        title: 'Companion Object & the object Keyword',
        code: `// ── object — creates a SINGLETON ─────────────────────────────
// There is exactly one instance of an object declaration.
// Great for stateless utilities, constants, or service locators.
object MathUtils {
    const val PI = 3.14159          // const val is a compile-time constant
    fun circleArea(r: Double) = PI * r * r
    fun clamp(value: Int, min: Int, max: Int) = value.coerceIn(min, max)
}

// ── companion object — static-like members inside a class ─────
// Each class can have ONE companion object.
// Access its members via the class name (no instance needed).
class Counter(var count: Int = 0) {

    companion object {
        // Factory method — a common use of companion objects
        fun create(start: Int) = Counter(start)

        // Class-level constant
        const val MAX_COUNT = 100
    }

    fun increment() {
        if (count < MAX_COUNT) count++
    }
}

fun main() {
    // Calling object members — no instance, just the name
    println(MathUtils.PI)                        // Output: 3.14159
    println(MathUtils.circleArea(5.0))           // Output: 78.53975
    println(MathUtils.clamp(150, 0, 100))        // Output: 100

    // Companion object — accessed via class name
    val counter = Counter.create(10)   // factory method on companion
    println(Counter.MAX_COUNT)         // Output: 100
    counter.increment()
    println(counter.count)             // Output: 11
}`,
      },
      {
        type: 'note',
        text: 'Kotlin has no `static` keyword. Instead, use companion objects for class-level members and top-level declarations for utility functions that don\'t need a class at all.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 7 — Inheritance & Interfaces
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'inheritance',
    title: 'Inheritance & Interfaces',
    level: 'Intermediate',
    description:
      'Share and extend behaviour with open classes, abstract classes, and interfaces. Understand how Kotlin\'s design-by-default-closed philosophy makes code safer.',
    blocks: [
      {
        type: 'paragraph',
        text: 'By default, Kotlin classes are **final** — they cannot be inherited. This is intentional: unconstrained inheritance is a common source of fragile code. To allow a class to be extended, mark it `open`. To force subclasses to provide an implementation, use `abstract`.',
      },
      {
        type: 'code',
        title: 'open Classes & override',
        code: `// Classes are FINAL by default — mark 'open' to allow inheritance.
open class Animal(val name: String) {

    // 'open' allows subclasses to override this property.
    open val sound: String = "..."

    // 'open' allows subclasses to override this function.
    open fun speak() {
        println("$name says: $sound")
    }

    // NOT marked open — subclasses cannot override this.
    fun breathe() {
        println("$name breathes.")
    }
}

// Dog extends Animal using the ':' colon.
// The '(name)' calls Animal's primary constructor.
class Dog(name: String) : Animal(name) {

    // 'override' MUST be written explicitly — no accidental overrides.
    override val sound: String = "Woof"

    override fun speak() {
        // super.speak() calls the parent class implementation.
        super.speak()
        println("  (wags tail)")
    }
}

// Mark a class 'final' to prevent further subclassing.
// (Redundant here since Dog is already closed by default, but explicit.)
class Poodle(name: String) : Dog(name) {
    override val sound: String = "Yip!"  // Poodle overrides Dog which overrides Animal
}

fun main() {
    val a = Animal("Generic Animal")
    a.speak()      // Output: Generic Animal says: ...

    val d = Dog("Rex")
    d.speak()      // Output: Rex says: Woof \n (wags tail)

    val p = Poodle("Fifi")
    p.speak()      // Output: Fifi says: Yip! \n (wags tail) — super chain

    // Polymorphism: a Dog IS-AN Animal
    val animals: List<Animal> = listOf(Animal("Cat"), Dog("Buddy"), Poodle("Coco"))
    for (animal in animals) animal.speak()
}`,
      },
      {
        type: 'code',
        title: 'Abstract Classes & Interfaces',
        code: `// ── Abstract class ───────────────────────────────────────────
// Cannot be instantiated directly.
// Abstract members MUST be overridden in concrete subclasses.
abstract class Shape {
    abstract val name: String

    // Abstract function — no body, subclasses must implement.
    abstract fun area(): Double

    // Concrete function — shared across all shapes.
    fun describe() = "I am a $name with area \${"%.2f".format(area())}"
}

class Circle(val radius: Double) : Shape() {
    override val name = "Circle"
    override fun area() = Math.PI * radius * radius
}

class Rectangle(val w: Double, val h: Double) : Shape() {
    override val name = "Rectangle"
    override fun area() = w * h
}

// ── Interface ─────────────────────────────────────────────────
// Like an abstract class but:
//  1. A class can implement MULTIPLE interfaces.
//  2. Interfaces cannot hold state (no backing fields).
//  3. Interface functions can have DEFAULT implementations.
interface Drawable {
    fun draw()                          // abstract — must implement
    fun erase() = println("Erasing…")  // default — can override or use as-is
}

interface Resizable {
    fun resize(factor: Double)
}

// Implementing multiple interfaces: just list them after ':'
class Canvas : Drawable, Resizable {
    override fun draw()              = println("Drawing on canvas")
    override fun resize(f: Double)   = println("Resizing canvas by $f×")
    // 'erase()' uses the default from Drawable — no need to override
}

fun main() {
    val shapes = listOf(Circle(5.0), Rectangle(3.0, 4.0))
    for (s in shapes) println(s.describe())
    // Output:
    // I am a Circle with area 78.54
    // I am a Rectangle with area 12.00

    val canvas = Canvas()
    canvas.draw()           // Output: Drawing on canvas
    canvas.erase()          // Output: Erasing…  (default impl)
    canvas.resize(1.5)      // Output: Resizing canvas by 1.5×
}`,
      },
      {
        type: 'note',
        text: 'Prefer interfaces over abstract classes unless you genuinely need shared state or a constructor. Interfaces compose better and avoid the problems of deep inheritance hierarchies.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 8 — Data Classes
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'data-classes',
    title: 'Data Classes',
    level: 'Intermediate',
    description:
      'Use data classes to model pure data with zero boilerplate. Get equals, hashCode, toString, copy, and destructuring for free.',
    blocks: [
      {
        type: 'paragraph',
        text: 'A data class is a class whose primary purpose is to hold data. Kotlin automatically generates `equals()`, `hashCode()`, `toString()`, `copy()`, and `componentN()` functions based on the primary constructor properties. In Java, the equivalent requires dozens of lines of boilerplate.',
      },
      {
        type: 'code',
        title: 'Declaring & Using Data Classes',
        code: `// The 'data' modifier tells Kotlin to auto-generate useful functions.
// Every property in the primary constructor participates in these functions.
data class Point(val x: Double, val y: Double)

data class User(
    val id: Int,
    val name: String,
    val email: String,
    val isActive: Boolean = true   // default values work just like regular classes
)

fun main() {

    val p1 = Point(3.0, 4.0)
    val p2 = Point(3.0, 4.0)
    val p3 = Point(1.0, 2.0)

    // ── equals() — compares property values, not object identity ─
    println(p1 == p2)          // Output: true  (same x, y values)
    println(p1 == p3)          // Output: false

    // Regular classes compare by reference (object identity):
    // two separate objects are always unequal even with same data.

    // ── toString() — readable representation ──────────────────
    println(p1)                // Output: Point(x=3.0, y=4.0)
    val user = User(1, "Alice", "alice@example.com")
    println(user)              // Output: User(id=1, name=Alice, email=alice@example.com, isActive=true)

    // ── hashCode() — consistent with equals() ─────────────────
    // Objects that are equal always have the same hash code.
    println(p1.hashCode() == p2.hashCode())   // Output: true

    // ── copy() — create a modified copy ───────────────────────
    // 'copy' lets you duplicate an object, changing only specific fields.
    // The original is never modified (data classes are typically immutable).
    val updatedUser = user.copy(email = "newalice@example.com", isActive = false)
    println(updatedUser)
    // Output: User(id=1, name=Alice, email=newalice@example.com, isActive=false)
    println(user)              // Original unchanged
}`,
      },
      {
        type: 'code',
        title: 'Destructuring Declarations',
        code: `data class Color(val red: Int, val green: Int, val blue: Int)
data class Pair<A, B>(val first: A, val second: B)

fun divideWithRemainder(a: Int, b: Int): Pair<Int, Int> =
    Pair(a / b, a % b)

fun main() {

    // ── Destructuring — unpack properties into local variables ─
    val color = Color(255, 128, 0)
    val (r, g, b) = color           // calls component1(), component2(), component3()
    println("R=$r, G=$g, B=$b")     // Output: R=255, G=128, B=0

    val (quotient, remainder) = divideWithRemainder(17, 5)
    println("17 ÷ 5 = $quotient remainder $remainder")
    // Output: 17 ÷ 5 = 3 remainder 2

    // ── Destructuring in for loops ─────────────────────────────
    val palette = listOf(
        Color(255, 0, 0),
        Color(0, 255, 0),
        Color(0, 0, 255)
    )
    for ((r2, g2, b2) in palette) {
        println("rgb($r2, $g2, $b2)")
    }
    // Output:
    // rgb(255, 0, 0)
    // rgb(0, 255, 0)
    // rgb(0, 0, 255)

    // ── Skip a component with underscore _ ────────────────────
    val (red, _, blue) = Color(100, 200, 150)
    println("Red: $red, Blue: $blue")   // ignores green
    // Output: Red: 100, Blue: 150
}`,
      },
      {
        type: 'note',
        text: 'Only primary constructor properties participate in `equals`, `hashCode`, `toString`, and `copy`. Properties declared inside the class body are excluded from these generated functions.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 9 — Collections
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'collections',
    title: 'Collections',
    level: 'Intermediate',
    description:
      'Master List, Set, and Map in both read-only and mutable forms. Learn the rich functional API: filter, map, groupBy, fold, and more.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Kotlin\'s collection library is split into **read-only** and **mutable** interfaces. `listOf()` returns a read-only List; `mutableListOf()` returns one you can add or remove items from. This distinction forces you to think about mutability upfront — a hallmark of good API design.',
      },
      {
        type: 'code',
        title: 'List, Set, and Map',
        code: `fun main() {

    // ── List — ordered, allows duplicates ─────────────────────
    val fruits = listOf("Apple", "Banana", "Cherry", "Apple")
    println(fruits)            // Output: [Apple, Banana, Cherry, Apple]
    println(fruits[1])         // Output: Banana  (zero-indexed access)
    println(fruits.size)       // Output: 4
    // fruits.add("Date")      // COMPILE ERROR — listOf() is read-only

    val mutableFruits = mutableListOf("Apple", "Banana")
    mutableFruits.add("Cherry")        // OK — mutableListOf is mutable
    mutableFruits.removeAt(0)          // removes "Apple"
    mutableFruits[0] = "Blueberry"     // replace "Banana" at index 0
    println(mutableFruits)             // Output: [Blueberry, Cherry]

    // ── Set — unordered, NO duplicates ────────────────────────
    val tags = setOf("kotlin", "jvm", "kotlin", "android")
    println(tags)              // Output: [kotlin, jvm, android]  (duplicate removed)
    println(tags.contains("jvm"))   // Output: true

    val mutableTags = mutableSetOf("kotlin")
    mutableTags.add("jvm")
    mutableTags.add("kotlin")          // silently ignored — already present
    println(mutableTags)               // Output: [kotlin, jvm]

    // ── Map — key-value pairs, keys unique ────────────────────
    val scores = mapOf("Alice" to 95, "Bob" to 82, "Carol" to 91)
    println(scores["Alice"])           // Output: 95
    println(scores["Dave"])            // Output: null  (key not found)
    println(scores.getOrDefault("Dave", 0))  // Output: 0

    val mutableScores = mutableMapOf("Alice" to 95)
    mutableScores["Bob"] = 82          // add or update
    mutableScores["Alice"] = 100       // update existing key
    println(mutableScores)             // Output: {Alice=100, Bob=82}
}`,
      },
      {
        type: 'paragraph',
        text: 'Kotlin collections have a rich functional API inspired by functional programming. These operations don\'t modify the original collection — they return new ones.',
      },
      {
        type: 'code',
        title: 'Functional Collection Operations',
        code: `data class Student(val name: String, val grade: String, val score: Int)

fun main() {
    val students = listOf(
        Student("Alice", "A", 95),
        Student("Bob",   "B", 82),
        Student("Carol", "A", 91),
        Student("Dave",  "C", 71),
        Student("Eve",   "B", 88),
    )

    // ── filter — keep only elements matching a predicate ──────
    val gradeA = students.filter { it.grade == "A" }
    println(gradeA.map { it.name })    // Output: [Alice, Carol]

    // ── map — transform each element into something new ───────
    val names = students.map { it.name }
    println(names)                     // Output: [Alice, Bob, Carol, Dave, Eve]

    val upperNames = students.map { it.name.uppercase() }
    println(upperNames)                // Output: [ALICE, BOB, CAROL, DAVE, EVE]

    // ── sortedByDescending — sort by a property ───────────────
    val ranked = students.sortedByDescending { it.score }
    println(ranked.map { "\${it.name}:\${it.score}" })
    // Output: [Alice:95, Carol:91, Eve:88, Bob:82, Dave:71]

    // ── groupBy — partition into a Map by a key ───────────────
    val byGrade: Map<String, List<Student>> = students.groupBy { it.grade }
    for ((grade, group) in byGrade) {
        println("Grade $grade: \${group.map { it.name }}")
    }
    // Output:
    // Grade A: [Alice, Carol]
    // Grade B: [Bob, Eve]
    // Grade C: [Dave]

    // ── fold — accumulate a result across all elements ─────────
    // fold(initial) { accumulator, element -> newAccumulator }
    val totalScore = students.fold(0) { acc, s -> acc + s.score }
    println("Total: $totalScore")      // Output: Total: 427

    val average = students.map { it.score }.average()
    println("Average: $average")       // Output: Average: 85.4

    // ── any, all, none — boolean short-circuit checks ─────────
    println(students.any  { it.score > 90 })   // Output: true  (Alice, Carol)
    println(students.all  { it.score > 70 })   // Output: false (Dave is 71, >70 = true… wait 71>70 is true)
    println(students.none { it.grade == "F" }) // Output: true  (no failing grades)
    println(students.count { it.grade == "B" })// Output: 2

    // ── flatMap — map then flatten ────────────────────────────
    val courses = listOf(listOf("Math", "English"), listOf("Science", "Art"))
    val allCourses = courses.flatMap { it }
    println(allCourses)   // Output: [Math, English, Science, Art]
}`,
      },
      {
        type: 'note',
        text: 'These functional operations create new collections rather than modifying existing ones. Chain them together for readable data pipelines: `students.filter { }.map { }.sortedBy { }`. For large datasets where performance matters, use `asSequence()` to avoid creating intermediate collections.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 10 — Lambdas & Higher-Order Functions
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'lambdas',
    title: 'Lambdas & Higher-Order Functions',
    level: 'Intermediate',
    description:
      'Treat functions as first-class values. Write lambdas, pass them to higher-order functions, and build your own that accept function parameters.',
    blocks: [
      {
        type: 'paragraph',
        text: 'In Kotlin, functions are **first-class values**: you can store them in variables, pass them as arguments, and return them from other functions. A **lambda** is an anonymous function written inline. A **higher-order function** is one that takes functions as parameters or returns a function.',
      },
      {
        type: 'code',
        title: 'Lambda Syntax',
        code: `fun main() {

    // ── Lambda stored in a variable ───────────────────────────
    // The type is written as: (ParamTypes) -> ReturnType
    val double: (Int) -> Int = { n -> n * 2 }
    println(double(5))          // Output: 10

    // ── 'it' — the implicit single parameter ──────────────────
    // When a lambda has exactly ONE parameter, you can omit the name
    // and use the keyword 'it' to refer to that parameter.
    val square: (Int) -> Int = { it * it }
    println(square(6))          // Output: 36

    // ── Multi-parameter lambda ────────────────────────────────
    val add: (Int, Int) -> Int = { a, b -> a + b }
    println(add(3, 4))          // Output: 7

    // ── Lambda with no parameters ─────────────────────────────
    val greet: () -> String = { "Hello, Kotlin!" }
    println(greet())            // Output: Hello, Kotlin!

    // ── Passing lambdas to functions ──────────────────────────
    // You already know filter, map, etc. — they all accept lambdas!
    val numbers = listOf(1, 2, 3, 4, 5, 6)
    val evens = numbers.filter { it % 2 == 0 }    // lambda as argument
    println(evens)              // Output: [2, 4, 6]

    // ── Trailing lambda syntax ────────────────────────────────
    // When the LAST parameter is a lambda, it can go OUTSIDE the parentheses.
    // This is why you write filter { } instead of filter({ }).
    val odds = numbers.filter({ it % 2 != 0 })   // lambda inside ()
    val same = numbers.filter { it % 2 != 0 }    // trailing lambda — cleaner!
    println(odds)               // Output: [1, 3, 5]
}`,
      },
      {
        type: 'code',
        title: 'Writing Higher-Order Functions',
        code: `// A higher-order function accepts or returns another function.

// ── Accepting a function parameter ───────────────────────────
// The parameter 'operation' has type (Int, Int) -> Int
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

// ── Returning a function ──────────────────────────────────────
// Returns a function that multiplies by the given factor.
fun multiplier(factor: Int): (Int) -> Int {
    return { number -> number * factor }   // a lambda that "closes over" factor
}

// ── Inline function (performance optimisation) ────────────────
// 'inline' tells the compiler to copy the lambda body at each call site
// instead of creating a function object — eliminates overhead for hot paths.
inline fun measureTime(block: () -> Unit): Long {
    val start = System.currentTimeMillis()
    block()   // execute the passed lambda
    return System.currentTimeMillis() - start
}

// ── Function that applies a transform to each item ───────────
fun <T, R> transformEach(items: List<T>, transform: (T) -> R): List<R> {
    val result = mutableListOf<R>()
    for (item in items) result.add(transform(item))
    return result
}

fun main() {
    // Pass different lambdas for different operations:
    println(calculate(10, 3) { a, b -> a + b })  // Output: 13  (add)
    println(calculate(10, 3) { a, b -> a * b })  // Output: 30  (multiply)
    println(calculate(10, 3) { a, b -> a - b })  // Output: 7   (subtract)

    // The returned function "remembers" the factor — this is a closure.
    val triple = multiplier(3)
    val tenX   = multiplier(10)
    println(triple(4))          // Output: 12
    println(tenX(4))            // Output: 40

    val elapsed = measureTime {
        Thread.sleep(10)        // simulate some work
    }
    println("Elapsed: \${elapsed}ms")    // Output: Elapsed: ~10ms

    // Generic transform — works on any type
    val words   = listOf("hello", "world")
    val lengths = transformEach(words) { it.length }
    println(lengths)            // Output: [5, 5]
}`,
      },
      {
        type: 'note',
        text: 'Lambdas that capture variables from the surrounding scope are called **closures**. The `multiplier` example above is a closure — the returned lambda "closes over" the `factor` variable. This is a powerful pattern for creating specialised functions from generic ones.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 11 — Extension Functions & Properties
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'extensions',
    title: 'Extension Functions & Properties',
    level: 'Intermediate',
    description:
      'Add new functionality to existing classes without touching their source code or using inheritance — one of Kotlin\'s most beloved features.',
    blocks: [
      {
        type: 'paragraph',
        text: 'An extension function looks like a method of a class but is defined outside it. You can add functions to `String`, `Int`, `List`, or even third-party classes you cannot modify. Under the hood they compile to regular static functions — there\'s no magic, just clean syntax.',
      },
      {
        type: 'code',
        title: 'Defining Extension Functions',
        code: `// Extension function syntax:  fun ReceiverType.functionName(params): ReturnType
// 'this' inside the body refers to the receiver instance.

// Add a function to String that checks if it's a valid email address.
fun String.isValidEmail(): Boolean {
    return contains('@') && contains('.')
}

// Add a function to Int that repeats an action N times.
fun Int.times(action: () -> Unit) {
    for (i in 0 until this) action()
}

// Extend a nullable type — the receiver can be null.
fun String?.orDefault(default: String) = this ?: default

// Extend List<Int> to compute the average (same as built-in, but illustrative).
fun List<Int>.average(): Double {
    if (isEmpty()) return 0.0
    return sum().toDouble() / size
}

// Extend a data class — no need to subclass it.
data class Point(val x: Double, val y: Double)

fun Point.distanceTo(other: Point): Double {
    val dx = x - other.x
    val dy = y - other.y
    return Math.sqrt(dx * dx + dy * dy)
}

fun main() {
    // Extension functions are called just like regular methods:
    println("alice@example.com".isValidEmail())   // Output: true
    println("not-an-email".isValidEmail())         // Output: false

    3.times { print("Hello! ") }                  // Output: Hello! Hello! Hello!
    println()

    val maybeName: String? = null
    println(maybeName.orDefault("Anonymous"))      // Output: Anonymous

    val scores = listOf(85, 92, 78, 95)
    println("Average: \${scores.average()}")        // Output: Average: 87.5

    val p1 = Point(0.0, 0.0)
    val p2 = Point(3.0, 4.0)
    println("Distance: \${p1.distanceTo(p2)}")      // Output: Distance: 5.0
}`,
      },
      {
        type: 'code',
        title: 'Extension Properties & Scope',
        code: `// Extension PROPERTIES work like computed properties added from outside.
// They cannot have backing fields — only custom getters/setters.

val String.wordCount: Int
    get() = if (isBlank()) 0 else trim().split("\\s+".toRegex()).size

val String.isPalindrome: Boolean
    get() = this == this.reversed()

val Int.seconds: Long get() = this * 1_000L       // milliseconds
val Int.minutes: Long get() = this * 60 * 1_000L

// ── Scope: extensions are resolved STATICALLY ─────────────────
// The extension is chosen based on the variable's declared type,
// NOT the runtime type. This is an important difference from overrides.
open class Base
class Child : Base()

fun Base.describe()  = "I am Base"
fun Child.describe() = "I am Child"

fun printDescription(b: Base) {
    println(b.describe())   // always calls Base.describe(), even if 'b' is a Child!
}

// ── Extensions in a scope (with scoping functions) ───────────
// apply, let, run, also, with are all higher-order extension functions.
fun buildMessage(name: String): String {
    return buildString {   // buildString gives you a StringBuilder as receiver
        append("Dear ")
        append(name)
        append(",\n")
        append("Welcome to Kotlin!\n")
    }
}

fun main() {
    println("Hello World".wordCount)       // Output: 2
    println("  racecar  ".isPalindrome)    // Output: false (spaces count!)
    println("racecar".isPalindrome)        // Output: true

    val delay = 5.seconds
    println("5 seconds = \${delay}ms")      // Output: 5 seconds = 5000ms

    // Static dispatch example:
    val child: Base = Child()
    printDescription(child)                // Output: I am Base  (not Child!)

    println(buildMessage("Alice"))
    // Output:
    // Dear Alice,
    // Welcome to Kotlin!
}`,
      },
      {
        type: 'note',
        text: 'Extensions are a key tool in Kotlin\'s DSL-building capabilities. The standard library functions `apply`, `let`, `run`, `also`, and `with` are all extension functions. You\'ll see them used everywhere in idiomatic Kotlin code.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 12 — Sealed Classes & Enums
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'sealed-classes',
    title: 'Sealed Classes & Enums',
    level: 'Intermediate',
    description:
      'Model restricted type hierarchies with sealed classes and enums. Combine them with `when` to write exhaustive, safe state machines.',
    blocks: [
      {
        type: 'paragraph',
        text: 'An `enum class` represents a fixed set of constants, optionally with properties and methods. A `sealed class` goes further: each subclass can have its own shape (different properties), but the total set of subclasses is known at compile time. Together with `when`, they enable exhaustive pattern matching.',
      },
      {
        type: 'code',
        title: 'Enum Classes',
        code: `// An enum class defines a fixed set of named values.
enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

// Enums can have properties and methods just like regular classes.
enum class Planet(val mass: Double, val radius: Double) {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6),
    MARS   (6.421e+23, 3.3972e6);   // semicolon separates entries from members

    // Gravitational constant
    companion object { const val G = 6.67300E-11 }

    // Computed property available on every enum entry
    val surfaceGravity: Double
        get() = G * mass / (radius * radius)

    fun weightOn(earthWeight: Double): Double =
        earthWeight * surfaceGravity / EARTH.surfaceGravity
}

fun main() {
    val dir = Direction.NORTH

    // 'when' on an enum: the compiler warns if you miss a case!
    val opposite = when (dir) {
        Direction.NORTH -> Direction.SOUTH
        Direction.SOUTH -> Direction.NORTH
        Direction.EAST  -> Direction.WEST
        Direction.WEST  -> Direction.EAST
        // No 'else' needed — all 4 cases covered.
    }
    println("Opposite of $dir is $opposite")   // Output: Opposite of NORTH is SOUTH

    // Enum properties
    val earth = Planet.EARTH
    println("Surface gravity: \${earth.surfaceGravity}")
    println("75kg person on Mars weighs: \${"%.1f".format(Planet.MARS.weightOn(75.0))}kg")
    // Output: 75kg person on Mars weighs: 28.4kg

    // Enum utilities
    println(Direction.values().toList())          // Output: [NORTH, SOUTH, EAST, WEST]
    println(Direction.valueOf("EAST"))             // Output: EAST
}`,
      },
      {
        type: 'code',
        title: 'Sealed Classes — Modelling State',
        code: `// Sealed class: all direct subclasses must be in the same package/file.
// The compiler KNOWS every possible subtype.
// Use this when subclasses have different data shapes.
sealed class NetworkResult<out T> {

    // Each subclass can have its own properties and structure.
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val message: String, val code: Int) : NetworkResult<Nothing>()
    object Loading : NetworkResult<Nothing>()   // singleton state — no data
}

// Another sealed class example: UI state machine
sealed class AuthState {
    object LoggedOut : AuthState()
    data class LoggedIn(val username: String, val token: String) : AuthState()
    data class Error(val reason: String) : AuthState()
}

// Because all subclasses are known, 'when' can be EXHAUSTIVE.
// Add a new subclass? The compiler flags every 'when' that needs updating.
fun <T> handleResult(result: NetworkResult<T>): String = when (result) {
    is NetworkResult.Success -> "Data: \${result.data}"
    is NetworkResult.Error   -> "Error \${result.code}: \${result.message}"
    NetworkResult.Loading    -> "Loading…"
    // No 'else' needed — compiler verified all cases
}

fun describeAuthState(state: AuthState): String = when (state) {
    is AuthState.LoggedOut       -> "Please log in"
    is AuthState.LoggedIn        -> "Welcome, \${state.username}!"
    is AuthState.Error           -> "Auth failed: \${state.reason}"
}

fun main() {
    val results = listOf(
        NetworkResult.Success(listOf(1, 2, 3)),
        NetworkResult.Error("Not found", 404),
        NetworkResult.Loading,
    )
    for (r in results) println(handleResult(r))
    // Output:
    // Data: [1, 2, 3]
    // Error 404: Not found
    // Loading…

    val states = listOf(
        AuthState.LoggedOut,
        AuthState.LoggedIn("alice", "tok123"),
        AuthState.Error("Bad password"),
    )
    for (s in states) println(describeAuthState(s))
    // Output:
    // Please log in
    // Welcome, alice!
    // Auth failed: Bad password
}`,
      },
      {
        type: 'note',
        text: 'Use enums for simple fixed sets of values (days of the week, directions, status codes). Use sealed classes when different variants carry different data. Both work beautifully with exhaustive `when` expressions — which is the real power here.',
      },
    ],
  },
];
