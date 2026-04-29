import type { Lesson } from './types';

export const advancedLessons: Lesson[] = [
  // ─────────────────────────────────────────────────────────────
  // LESSON 13 — Generics
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'generics',
    title: 'Generics',
    level: 'Advanced',
    description:
      'Write type-safe code that works across multiple types. Understand type parameters, constraints, variance (in/out), and reified generics.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Generics let you write one function or class that works correctly with many types while keeping full type safety. Without generics, you\'d have to duplicate code for each type or lose type information by using `Any`. The type parameter (written in angle brackets like `<T>`) is a placeholder filled in at the call site.',
      },
      {
        type: 'code',
        title: 'Generic Functions & Classes',
        code: `// ── Generic function — <T> introduces the type parameter ─────
// T is a placeholder; it's inferred from the argument at the call site.
fun <T> printAndReturn(value: T): T {
    println(value)
    return value
}

// Type constraints — 'T : Comparable<T>' means T must implement Comparable.
fun <T : Comparable<T>> maxOf(a: T, b: T): T = if (a > b) a else b

// Multiple constraints using 'where'
fun <T> stringify(value: T): String where T : Any, T : Comparable<T> {
    return value.toString()
}

// ── Generic class ─────────────────────────────────────────────
// A type-safe box that can hold exactly one item of any type.
class Box<T>(var content: T) {
    fun get(): T = content
    fun set(newContent: T) { content = newContent }
    fun isEmpty() = content == null

    // A method that creates a new Box by transforming the content.
    fun <R> map(transform: (T) -> R): Box<R> = Box(transform(content))
}

// ── Generic interface ─────────────────────────────────────────
interface Repository<T, ID> {
    fun findById(id: ID): T?
    fun save(entity: T)
    fun delete(id: ID)
    fun findAll(): List<T>
}

data class User(val id: Int, val name: String)

class InMemoryUserRepo : Repository<User, Int> {
    private val store = mutableMapOf<Int, User>()
    override fun findById(id: Int) = store[id]
    override fun save(entity: User) { store[entity.id] = entity }
    override fun delete(id: Int) { store.remove(id) }
    override fun findAll() = store.values.toList()
}

fun main() {
    // Type is inferred — no need to write <String> explicitly
    val s = printAndReturn("Kotlin")   // Output: Kotlin
    val n = printAndReturn(42)         // Output: 42

    println(maxOf(3, 7))              // Output: 7
    println(maxOf("apple", "zebra"))  // Output: zebra
    println(maxOf(3.14, 2.71))        // Output: 3.14

    val intBox = Box(100)
    println(intBox.get())             // Output: 100
    val strBox = intBox.map { it.toString() + "!" }
    println(strBox.get())             // Output: 100!

    val repo = InMemoryUserRepo()
    repo.save(User(1, "Alice"))
    repo.save(User(2, "Bob"))
    println(repo.findById(1))         // Output: User(id=1, name=Alice)
    println(repo.findAll())           // Output: [User(id=1, ...), User(id=2, ...)]
}`,
      },
      {
        type: 'code',
        title: 'Variance: in, out & Reified Generics',
        code: `// ── Covariance: 'out' ────────────────────────────────────────
// An 'out T' producer can only produce T, never consume it.
// Producer<Dog> IS-A Producer<Animal> (covariant).
interface Producer<out T> {
    fun produce(): T
}

// ── Contravariance: 'in' ──────────────────────────────────────
// An 'in T' consumer can only consume T, never produce it.
// Consumer<Animal> IS-A Consumer<Dog> (contravariant).
interface Consumer<in T> {
    fun consume(item: T)
}

// ── Practical example with use-site variance ─────────────────
fun copyInto(source: List<out Number>, dest: MutableList<Number>) {
    // 'out Number' means source can be List<Int>, List<Double>, etc.
    for (item in source) dest.add(item)
}

// ── reified — access type information at runtime ──────────────
// Normally, generic type parameters are ERASED at runtime (JVM limitation).
// 'reified' + 'inline' lets you use T as a real type at runtime.
inline fun <reified T> filterByType(items: List<Any>): List<T> {
    return items.filterIsInstance<T>()   // 'is T' check only works with reified
}

inline fun <reified T> Any.isInstanceOf(): Boolean = this is T

fun main() {
    // Variance example
    val ints: List<Int> = listOf(1, 2, 3)
    val nums: MutableList<Number> = mutableListOf(0.5)
    copyInto(ints, nums)        // List<Int> is List<out Number> — OK!
    println(nums)               // Output: [0.5, 1, 2, 3]

    // Reified example
    val mixed: List<Any> = listOf(1, "hello", 2.5, "world", true)
    val strings  = filterByType<String>(mixed)
    val integers = filterByType<Int>(mixed)
    println(strings)            // Output: [hello, world]
    println(integers)           // Output: [1]

    println("kotlin".isInstanceOf<String>())   // Output: true
    println(42.isInstanceOf<String>())         // Output: false
}`,
      },
      {
        type: 'note',
        text: '`out T` means the generic type is a *producer* (think `List<out T>` — you read from it). `in T` means it is a *consumer* (think `Comparator<in T>` — you write into it). When in doubt, ask: does this API produce values, consume them, or both?',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 14 — Coroutines
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'coroutines',
    title: 'Coroutines',
    level: 'Advanced',
    description:
      'Write asynchronous, non-blocking code as if it were sequential. Understand suspend functions, coroutine builders, dispatchers, and Flow.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Concurrency is hard. Threads are expensive (each uses ~1MB of stack memory) and callback-based code is notoriously difficult to read and debug. Kotlin coroutines are lightweight threads that can be **suspended** without blocking the underlying thread — you can run thousands of them simultaneously on just a handful of system threads.',
      },
      {
        type: 'code',
        title: 'suspend Functions & Coroutine Builders',
        code: `// Add to build.gradle.kts: implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
import kotlinx.coroutines.*

// A 'suspend' function can pause its execution without blocking the thread.
// It can only be called from a coroutine or another suspend function.
suspend fun fetchUser(id: Int): String {
    delay(100)             // suspend: pauses THIS coroutine, thread stays free
    return "User#$id"
}

suspend fun fetchScore(userId: String): Int {
    delay(50)
    return 95
}

fun main() = runBlocking {
    // runBlocking starts a coroutine scope and blocks the current thread.
    // Use it in main() or tests. Never use in production coroutine code.

    // ── launch — fire-and-forget ───────────────────────────────
    // Returns a Job you can cancel or join. Result is discarded.
    val job = launch {
        val user = fetchUser(1)
        println("Launched: $user")    // Output: Launched: User#1
    }

    // ── async — returns a result (Deferred<T>) ─────────────────
    // Deferred is a future/promise. Call .await() to get the value.
    val userDeferred  = async { fetchUser(2) }
    val scoreDeferred = async { fetchScore("User#2") }

    // Both fetchUser and fetchScore run CONCURRENTLY.
    // .await() suspends until the result is ready.
    val user  = userDeferred.await()
    val score = scoreDeferred.await()
    println("Concurrent: $user scored $score")
    // Output: Concurrent: User#2 scored 95

    job.join()   // wait for the launched job to finish
}`,
      },
      {
        type: 'code',
        title: 'Dispatchers, Scope & Flow',
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// ── Dispatchers: choose which thread pool to use ─────────────
// Dispatchers.Main   — UI thread (Android/Swing)
// Dispatchers.IO     — disk/network I/O (large pool of threads)
// Dispatchers.Default— CPU-intensive work (# threads = # CPU cores)

suspend fun loadFromDisk(): String = withContext(Dispatchers.IO) {
    // This block runs on the IO dispatcher.
    // withContext switches dispatchers and suspends until done.
    delay(200)   // simulates I/O wait
    "data from disk"
}

// ── CoroutineScope — defines the lifecycle of coroutines ──────
// When a scope is cancelled, all coroutines inside it are cancelled.
// Structured concurrency: parent always waits for children.
class DataRepository {
    // In real Android, this would be viewModelScope or lifecycleScope
    private val scope = CoroutineScope(Dispatchers.Default + SupervisorJob())

    fun startLoading() {
        scope.launch {
            val data = loadFromDisk()
            println("Loaded: $data")
        }
    }

    fun cancel() = scope.cancel()   // cancels all running coroutines in this scope
}

// ── Flow — cold, observable stream of values ──────────────────
// A Flow emits multiple values over time (like a sequence, but async).
// 'cold' means it doesn't start producing values until collected.
fun countDown(from: Int): Flow<Int> = flow {
    for (i in from downTo 1) {
        delay(100)        // suspend between emissions
        emit(i)           // send the next value downstream
    }
}

fun main() = runBlocking {
    // Collect the flow — this is where execution begins
    countDown(5).collect { value ->
        print("$value ")  // Output: 5 4 3 2 1 (with 100ms pauses)
    }
    println()

    // Flow operators — same pipeline style as collections, but async
    countDown(10)
        .filter { it % 2 == 0 }    // keep only even numbers
        .map    { it * it }         // square them
        .take(3)                    // stop after 3 items
        .collect { println(it) }   // Output: 100, 64, 36
}`,
      },
      {
        type: 'note',
        text: 'Never call `runBlocking` from within a coroutine or from the UI thread — it blocks the thread and defeats the purpose. In Android, use `viewModelScope.launch`. On the server (Ktor, Spring), the framework provides the scope. `runBlocking` is only for `main()` and unit tests.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 15 — Building DSLs
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'dsl',
    title: 'Building DSLs',
    level: 'Advanced',
    description:
      'Leverage function literals with receivers to build type-safe domain-specific languages (DSLs) — a technique used in Gradle, Ktor, Jetpack Compose, and more.',
    blocks: [
      {
        type: 'paragraph',
        text: 'A Domain-Specific Language (DSL) is a mini-language tailored to a specific problem. Kotlin\'s feature of **function literals with receivers** lets you build DSLs that feel like native language constructs while remaining type-safe. Gradle build scripts, Ktor routing, and Jetpack Compose are all built on this technique.',
      },
      {
        type: 'code',
        title: 'Function Literals with Receivers',
        code: `// A function literal with receiver: the lambda's body gets access to
// 'this' as an instance of the receiver type — like being inside an extension function.

// Simple example: configure a StringBuilder in a lambda
fun buildMyString(action: StringBuilder.() -> Unit): String {
    val sb = StringBuilder()
    sb.action()       // 'this' inside 'action' is the StringBuilder
    return sb.toString()
}

// Even simpler: Kotlin's built-in buildString does exactly this
val result = buildString {
    // Inside here, 'this' is a StringBuilder — you're "inside" it!
    append("Hello")
    append(", ")
    append("World")
    append("!")
}

// ── apply — configures an object and returns it ───────────────
// apply is defined as: fun <T> T.apply(block: T.() -> Unit): T
// The lambda has the receiver as 'this', perfect for builder patterns.
data class ServerConfig(
    var host: String = "localhost",
    var port: Int    = 8080,
    var debug: Boolean = false,
    var maxConnections: Int = 100
)

fun createServer(config: ServerConfig.() -> Unit): ServerConfig {
    return ServerConfig().apply(config)
}

fun main() {
    println(result)   // Output: Hello, World!

    val server = createServer {
        // Inside this lambda, 'this' is a ServerConfig
        host = "api.myapp.com"
        port = 443
        debug = false
        maxConnections = 500
    }
    println(server)
    // Output: ServerConfig(host=api.myapp.com, port=443, debug=false, maxConnections=500)
}`,
      },
      {
        type: 'code',
        title: 'Building a Type-Safe HTML DSL',
        code: `// A real-world example: a type-safe builder for HTML.
// This is the same pattern used by Kotlin's kotlinx.html library.

// @DslMarker prevents accidentally calling parent-scope functions
// from inside a child builder, avoiding confusing DSL nesting bugs.
@DslMarker
annotation class HtmlDsl

@HtmlDsl
abstract class Tag(val name: String) {
    private val children = mutableListOf<Tag>()
    private val attrs    = mutableMapOf<String, String>()

    // Attribute DSL function
    fun attr(key: String, value: String) { attrs[key] = value }

    // Register a child tag and configure it with the provided lambda.
    // The receiver of 'block' is the child — 'this' inside the lambda is the child tag.
    protected fun <T : Tag> initTag(tag: T, block: T.() -> Unit): T {
        tag.block()          // configure the tag using its own receiver
        children.add(tag)
        return tag
    }

    // Render to HTML string
    fun render(): String {
        val attrStr = attrs.entries.joinToString(" ") { "\${it.key}=\"\${it.value}\"" }
        val openTag = if (attrStr.isEmpty()) "<$name>" else "<$name $attrStr>"
        val body = children.joinToString("\n  ") { it.render() }
        return if (body.isEmpty()) openTag else "$openTag\n  $body\n</$name>"
    }
}

// Text node — a leaf tag that holds raw text
class TextNode(val text: String) : Tag("") {
    override fun render() = text
}

class Div : Tag("div") {
    fun p(block: P.() -> Unit)   = initTag(P(), block)
    fun div(block: Div.() -> Unit) = initTag(Div(), block)
    fun text(content: String)    { initTag(TextNode(content)) {} }
}
class P : Tag("p") {
    fun text(content: String) { initTag(TextNode(content)) {} }
}
class Html : Tag("html") {
    fun div(block: Div.() -> Unit) = initTag(Div(), block)
}

// Top-level DSL entry point
fun html(block: Html.() -> Unit): Html = Html().apply(block)

fun main() {
    val page = html {
        div {
            attr("id", "main")
            p { text("Welcome to the Kotlin DSL demo!") }
            div {
                attr("class", "section")
                p { text("DSLs make configuration code read like prose.") }
                p { text("All of this is type-safe — mistakes are caught at compile time.") }
            }
        }
    }
    println(page.render())
    // Prints well-structured HTML with proper nesting
}`,
      },
      {
        type: 'note',
        text: '`@DslMarker` is crucial for preventing scope pollution. Without it, inside a nested builder you could accidentally call functions from parent scopes, leading to hard-to-find bugs. Always annotate your DSL receiver classes with `@DslMarker`.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 16 — Delegation
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'delegation',
    title: 'Delegation',
    level: 'Advanced',
    description:
      'Use the `by` keyword to delegate class implementations and property access to other objects. Explore lazy, observable, and custom property delegates.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Delegation is a design pattern where an object forwards method calls to a helper object. Kotlin builds delegation into the language with the `by` keyword, generating the forwarding code automatically at compile time. This gives you the power of inheritance without its problems — easy composition, no fragile base class issues.',
      },
      {
        type: 'code',
        title: 'Class Delegation with by',
        code: `// Interface defining some behaviour
interface Printer {
    fun print(message: String)
    fun printHeader()
}

// A concrete implementation
class ConsolePrinter : Printer {
    override fun print(message: String)  = println("[CONSOLE] $message")
    override fun printHeader()           = println("=".repeat(40))
}

class FilePrinter(val filename: String) : Printer {
    override fun print(message: String)  = println("[FILE:$filename] $message")
    override fun printHeader()           = println("-".repeat(40))
}

// ── Class delegation with 'by' ────────────────────────────────
// EnhancedPrinter delegates ALL Printer methods to the 'base' printer.
// You don't need to write any forwarding boilerplate.
class EnhancedPrinter(private val base: Printer) : Printer by base {
    // Only override the methods you want to change.
    // 'print' and 'printHeader' are forwarded to 'base' automatically.

    // Add timestamp wrapping around the delegated print:
    fun printWithTimestamp(message: String) {
        val ts = java.time.LocalTime.now().toString().take(8)
        base.print("[$ts] $message")
    }
}

fun main() {
    val console  = EnhancedPrinter(ConsolePrinter())
    val file     = EnhancedPrinter(FilePrinter("log.txt"))

    console.printHeader()                      // delegated to ConsolePrinter
    console.print("Hello")                     // delegated to ConsolePrinter
    console.printWithTimestamp("Timestamped")  // new behaviour

    file.printHeader()                         // delegated to FilePrinter
    file.print("Hello from file")
}`,
      },
      {
        type: 'code',
        title: 'Property Delegates: lazy, observable & Custom',
        code: `import kotlin.properties.Delegates
import kotlin.reflect.KProperty

// ── lazy — compute a value only once, on first access ─────────
// Perfect for expensive computations you might not always need.
val heavyObject: String by lazy {
    println("Computing expensive value...")
    "I am expensive"    // last expression is the value
}

// lazy is thread-safe by default (LazyThreadSafetyMode.SYNCHRONIZED)

// ── observable — react to property changes ────────────────────
// The lambda receives: property, old value, new value.
var userName: String by Delegates.observable("Guest") { prop, old, new ->
    println("\${prop.name} changed: '$old' → '$new'")
}

// ── vetoable — conditionally reject changes ───────────────────
// Return false from the lambda to prevent the change.
var rating: Int by Delegates.vetoable(0) { _, old, new ->
    val accepted = new in 1..5
    if (!accepted) println("Rating $new rejected! Must be 1-5.")
    accepted   // true = accept the change; false = keep old value
}

// ── Custom property delegate ───────────────────────────────────
// A delegate must implement getValue (and optionally setValue).
class Clamped(private val min: Int, private val max: Int) {
    private var value: Int = min

    operator fun getValue(thisRef: Any?, property: KProperty<*>): Int = value

    operator fun setValue(thisRef: Any?, property: KProperty<*>, newValue: Int) {
        value = newValue.coerceIn(min, max)   // silently clamp out-of-range values
    }
}

class Settings {
    var volume: Int  by Clamped(0, 100)
    var brightness: Int by Clamped(0, 255)
}

fun main() {
    // lazy — computed only when first accessed
    println("Before access")
    println(heavyObject)   // Output: Computing expensive value... \n I am expensive
    println(heavyObject)   // Output: I am expensive  (no re-computation!)

    // observable
    userName = "Alice"     // Output: userName changed: 'Guest' → 'Alice'
    userName = "Bob"       // Output: userName changed: 'Alice' → 'Bob'

    // vetoable
    rating = 4             // accepted — within 1..5
    println(rating)        // Output: 4
    rating = 7             // Output: Rating 7 rejected! Must be 1-5.
    println(rating)        // Output: 4  (unchanged)

    // custom delegate
    val s = Settings()
    s.volume = 150         // silently clamped to 100
    println(s.volume)      // Output: 100
    s.volume = -10         // silently clamped to 0
    println(s.volume)      // Output: 0
}`,
      },
      {
        type: 'note',
        text: 'Delegation shines when you want to compose behaviour rather than inherit it. As a rule: reach for delegation before inheritance. It keeps your classes focused, testable, and easy to swap — just pass a different delegate object.',
      },
    ],
  },
];
