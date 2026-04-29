import type { Lesson } from './types';

export const beginnerLessons: Lesson[] = [
  // ─────────────────────────────────────────────────────────────
  // LESSON 1 — Hello, Kotlin!
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'hello-kotlin',
    title: 'Hello, Kotlin!',
    level: 'Beginner',
    description:
      'Write your very first Kotlin program. Learn the structure of a Kotlin file, how to print output to the console, and how to write comments.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Kotlin is a modern, statically-typed programming language created by JetBrains. It runs on the JVM (Java Virtual Machine), compiles to JavaScript or native binaries, and is the official language for Android development. Kotlin is designed to be concise, expressive, and safe by default.',
      },
      {
        type: 'list',
        items: [
          'Concise — dramatically less boilerplate than Java',
          'Safe — null safety is built into the type system',
          'Interoperable — call any Java library from Kotlin and vice versa',
          'Multiplatform — share code across JVM, JS, Android, iOS, and more',
          'Expressive — data classes, lambdas, extension functions, and DSLs',
        ],
      },
      {
        type: 'code',
        title: 'Your First Kotlin Program',
        code: `// Every Kotlin program starts at the main() function.
// The JVM looks for this exact function to begin execution.
fun main() {

    // println() prints text to the console AND moves to a new line.
    // "ln" stands for "line" — think of it as "print + newline".
    println("Hello, Kotlin!")          // Output: Hello, Kotlin!

    // print() outputs text WITHOUT a trailing newline.
    // The next print will continue on the same line.
    print("Hello ")
    print("World")                     // Output: Hello World (on one line)

    // Calling println() with no argument just prints a blank newline.
    println()                          // moves cursor to next line

    // You can print any value — numbers, booleans, etc.
    println(42)                        // Output: 42
    println(3.14)                      // Output: 3.14
    println(true)                      // Output: true
}`,
      },
      {
        type: 'paragraph',
        text: 'The `fun` keyword declares a function. `main` is the special entry-point name the JVM expects. The curly braces `{ }` wrap the function body — all code inside runs when the program starts.',
      },
      {
        type: 'code',
        title: 'Comments in Kotlin',
        code: `fun main() {

    // This is a single-line comment. The compiler ignores it entirely.
    // Use comments to explain WHY the code does something, not WHAT it does.

    /*
     * This is a multi-line (block) comment.
     * Great for longer explanations or temporarily disabling code.
     */

    /**
     * This is a KDoc comment — Kotlin's documentation format.
     * IDEs and tools like Dokka can generate HTML docs from these.
     * @param name the name to greet
     */

    // Comments can appear at the end of a line too:
    println("Learning Kotlin!")  // this prints a greeting

    // Nested block comments are also supported (useful for documentation):
    /* Outer comment /* inner comment */ still outer */
    println("Done!")
}`,
      },
      {
        type: 'note',
        text: 'Try Kotlin instantly in your browser at play.kotlinlang.org — no installation required. Paste any code example from this tutorial there and press Run to see the output live.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2 — Variables & Data Types
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'variables',
    title: 'Variables & Data Types',
    level: 'Beginner',
    description:
      'Learn how to store data with `val` and `var`, explore Kotlin\'s built-in types, and master string templates for embedding values in text.',
    blocks: [
      {
        type: 'paragraph',
        text: 'In Kotlin every variable is declared with either `val` or `var`. This single choice communicates intent clearly: `val` (value) is read-only once assigned; `var` (variable) can be reassigned. Prefer `val` whenever possible — it makes code easier to reason about and is safer in concurrent contexts.',
      },
      {
        type: 'code',
        title: 'val vs var',
        code: `fun main() {

    // val = "value" — read-only, cannot be reassigned after initialization.
    // Think of it like a constant, or a Java final variable.
    val name = "Alice"
    val age  = 30

    // var = "variable" — can be reassigned at any time.
    var score = 0
    score = 50       // OK — var allows reassignment
    score += 10      // OK — now 60

    // name = "Bob"  // ERROR: val cannot be reassigned
    // age  = 31     // ERROR: val cannot be reassigned

    println("Name: $name, Age: $age, Score: $score")
    // Output: Name: Alice, Age: 30, Score: 60

    // Kotlin infers the type from the initial value (type inference).
    // You can also write the type explicitly if you prefer clarity:
    val city: String = "Tokyo"
    var temperature: Int = 22
}`,
      },
      {
        type: 'paragraph',
        text: 'Kotlin has a rich set of built-in types. Unlike Java\'s primitives vs wrapper objects, Kotlin represents everything as an object — but the compiler optimises to primitives under the hood for performance.',
      },
      {
        type: 'code',
        title: 'Built-in Types',
        code: `fun main() {

    // ── Numeric types ──────────────────────────────────────────
    val intVal:    Int    = 42            // 32-bit signed integer  (-2B to +2B)
    val longVal:   Long   = 9_000_000_000L // 64-bit integer (note the L suffix)
    val doubleVal: Double = 3.14159       // 64-bit floating point (default decimal)
    val floatVal:  Float  = 3.14f         // 32-bit floating point  (note the f suffix)

    // Underscores inside numbers are ignored — they just improve readability.
    val population = 8_100_000_000L      // 8.1 billion, much clearer than 8100000000

    // Hexadecimal and binary literals
    val hexColor = 0xFF5733              // 0x prefix = hex
    val flags    = 0b1101_0010           // 0b prefix = binary

    // ── Other basic types ──────────────────────────────────────
    val letter:    Char    = 'K'          // Single Unicode character (single quotes!)
    val isKotlin:  Boolean = true         // true or false — only two values
    val greeting:  String  = "Hello"      // Sequence of characters (double quotes!)

    // ── Type conversions ───────────────────────────────────────
    // Kotlin does NOT do implicit type widening (unlike Java).
    // You must call the conversion function explicitly.
    val x: Int    = 5
    val y: Double = x.toDouble()          // explicit conversion
    val z: Long   = x.toLong()

    println("Int: $intVal, Double: $doubleVal, Char: $letter, Bool: $isKotlin")
}`,
      },
      {
        type: 'paragraph',
        text: 'String templates let you embed variables and expressions directly inside string literals using the `$` sign. This eliminates messy string concatenation and makes code far more readable.',
      },
      {
        type: 'code',
        title: 'String Templates & Raw Strings',
        code: `fun main() {

    val name  = "Alice"
    val age   = 30
    val score = 98.5

    // ── Simple embedding — just prefix a variable with $ ──────
    println("Hello, $name!")               // Output: Hello, Alice!
    println("Your score: $score")          // Output: Your score: 98.5

    // ── Expression embedding — wrap in \${ } for any expression ─
    println("Next year you'll be \${age + 1}") // Output: Next year you'll be 31
    println("Name length: \${name.length}")    // Output: Name length: 5
    println("Uppercase: \${name.uppercase()}") // Output: Uppercase: ALICE

    // ── Raw (triple-quoted) strings ────────────────────────────
    // Triple quotes preserve newlines and indentation literally.
    // No need to escape special characters like \n or \".
    val poem = """
        Roses are red,
        Kotlin is grand,
        $name scored $score,
        exactly as planned!
    """.trimIndent()  // trimIndent() removes the common leading spaces

    println(poem)
    // Output:
    // Roses are red,
    // Kotlin is grand,
    // Alice scored 98.5,
    // exactly as planned!

    // ── Escaping $ when you don't want interpolation ──────────
    println("Price: \$\${score}")           // Output: Price: $98.5
}`,
      },
      {
        type: 'note',
        text: 'Rule of thumb: always use `val` first. Only switch to `var` if you genuinely need to change the value later. Most well-written Kotlin code consists almost entirely of `val` declarations.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 3 — Functions
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'functions',
    title: 'Functions',
    level: 'Beginner',
    description:
      'Define reusable blocks of logic with functions. Discover default parameter values, named arguments, single-expression functions, and local functions.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Functions are the primary building block for organising logic in Kotlin. A function groups a set of statements together under a name so they can be called repeatedly. The `fun` keyword introduces a function, followed by the name, parameters in parentheses, the return type after a colon, and the body in curly braces.',
      },
      {
        type: 'code',
        title: 'Basic Function Anatomy',
        code: `// A function that takes two Ints and returns their sum.
//
//  fun  name  (params)        : ReturnType { body }
//   ↓    ↓       ↓                ↓           ↓
fun  add (a: Int, b: Int)  : Int      { return a + b }

// A function that returns nothing uses 'Unit' (equivalent to Java's void).
// Writing ': Unit' is optional — Kotlin infers it automatically.
fun greet(name: String): Unit {
    println("Hello, $name!")
}
// Same function, with the explicit ': Unit' omitted (preferred style):
fun greet2(name: String) {
    println("Hello again, $name!")
}

fun main() {
    val result = add(3, 5)     // call add(), store return value in result
    println(result)            // Output: 8

    greet("Alice")             // Output: Hello, Alice!
    greet2("Bob")              // Output: Hello again, Bob!

    // The return value of add() can be used directly in an expression:
    println("Sum: \${add(10, 20)}")   // Output: Sum: 30
}`,
      },
      {
        type: 'paragraph',
        text: 'Kotlin supports **default parameter values**. When a caller omits an argument, the default is used automatically. Combined with **named arguments**, you can call functions with clarity and skip only the parameters you don\'t need to customise.',
      },
      {
        type: 'code',
        title: 'Default Parameters & Named Arguments',
        code: `// Default values are specified with = after the type.
// Here, 'times' defaults to 1 if not provided by the caller.
fun repeat(message: String, times: Int = 1, separator: String = ", ") {
    val result = (1..times).joinToString(separator) { message }
    println(result)
}

fun createProfile(name: String, age: Int = 0, city: String = "Unknown") {
    println("$name, age $age, from $city")
}

fun main() {

    // ── Using defaults ─────────────────────────────────────────
    repeat("Hi")               // uses default times=1, separator=", "
    // Output: Hi

    repeat("Ha", 3)            // provides times, uses default separator
    // Output: Ha, Ha, Ha

    repeat("Go", 3, " | ")    // provides all three arguments
    // Output: Go | Go | Go

    // ── Named arguments ───────────────────────────────────────
    // You can pass arguments by name in any order.
    // This makes the call self-documenting and skips specific defaults.
    createProfile(name = "Alice")
    // Output: Alice, age 0, from Unknown

    createProfile(name = "Bob", city = "London")
    // Output: Bob, age 0, from London  (age still uses default)

    createProfile(age = 25, name = "Carol", city = "Paris")
    // Output: Carol, age 25, from Paris  (any order works with named args)
}`,
      },
      {
        type: 'paragraph',
        text: 'When a function body is a single expression, you can drop the curly braces and `return` keyword, writing just `= expression`. This is called an **expression body** and is very common in Kotlin.',
      },
      {
        type: 'code',
        title: 'Single-Expression & Local Functions',
        code: `// ── Standard body ────────────────────────────────────────────
fun square(n: Int): Int {
    return n * n
}

// ── Expression body — exactly the same, just shorter ─────────
// The return type is also inferred, so ': Int' can be omitted.
fun squareExpr(n: Int) = n * n

// Another example:
fun max(a: Int, b: Int) = if (a > b) a else b

// ── Local functions (functions inside functions) ──────────────
// Useful for helper logic that only makes sense within one function.
// Local functions can access variables from the enclosing scope.
fun processOrder(orderId: Int, discount: Double) {
    val basePrice = 100.0

    // A local function — only visible inside processOrder().
    // It "closes over" basePrice from the outer scope.
    fun applyDiscount(price: Double) = price * (1.0 - discount)

    val finalPrice = applyDiscount(basePrice)
    println("Order $orderId — Final price: \$\${"%.2f".format(finalPrice)}")
}

fun main() {
    println(square(5))         // Output: 25
    println(squareExpr(7))     // Output: 49
    println(max(3, 9))         // Output: 9

    processOrder(1001, 0.10)   // Output: Order 1001 — Final price: $90.00
    processOrder(1002, 0.25)   // Output: Order 1002 — Final price: $75.00
}`,
      },
      {
        type: 'note',
        text: 'Kotlin functions are first-class values — you can store them in variables, pass them as arguments, and return them from other functions. You\'ll explore this power in the Lambdas lesson.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 4 — Control Flow
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'control-flow',
    title: 'Control Flow',
    level: 'Beginner',
    description:
      'Control the path your program takes with if/else expressions, the powerful when expression, and Kotlin\'s variety of loops.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Control flow determines which code runs and how many times it runs. Kotlin\'s big insight: `if` and `when` are **expressions**, not just statements. This means they produce a value you can assign to a variable or return from a function — no ternary operator needed.',
      },
      {
        type: 'code',
        title: 'if / else as an Expression',
        code: `fun main() {

    // ── Standard if/else statement (classic style) ─────────────
    val temperature = 28
    if (temperature > 25) {
        println("It's hot outside!")
    } else {
        println("It's comfortable.")
    }

    // ── if/else as an EXPRESSION ───────────────────────────────
    // The entire if/else block evaluates to a value.
    // No need for a ternary operator (?:) like in Java/JavaScript.
    val description = if (temperature > 25) "hot" else "comfortable"
    println("The weather is $description.")   // Output: The weather is hot.

    // ── Multi-branch if/else expression ───────────────────────
    val score = 75
    val grade = if (score >= 90) {
        "A"
    } else if (score >= 80) {
        "B"
    } else if (score >= 70) {
        "C"         // ← this branch runs; score is 75
    } else {
        "F"
    }
    // The last expression in each branch is the branch's value.
    println("Grade: $grade")                  // Output: Grade: C

    // ── Single-expression branches can omit braces ────────────
    val status = if (score >= 60) "pass" else "fail"
    println("Status: $status")                // Output: Status: pass
}`,
      },
      {
        type: 'paragraph',
        text: 'The `when` expression is Kotlin\'s supercharged replacement for Java\'s switch statement. It can match values, ranges, types, and arbitrary conditions — all in one clean block.',
      },
      {
        type: 'code',
        title: 'The when Expression',
        code: `fun main() {

    // ── Basic when — match against a value ───────────────────
    val day = 3
    val dayName = when (day) {
        1    -> "Monday"
        2    -> "Tuesday"
        3    -> "Wednesday"   // ← matches; dayName = "Wednesday"
        4    -> "Thursday"
        5    -> "Friday"
        6, 7 -> "Weekend"     // multiple values separated by comma
        else -> "Unknown"     // else is required unless all cases are covered
    }
    println(dayName)           // Output: Wednesday

    // ── when with ranges ─────────────────────────────────────
    val score = 85
    val grade = when (score) {
        in 90..100 -> "A"
        in 80..89  -> "B"    // ← matches; score is 85
        in 70..79  -> "C"
        in 60..69  -> "D"
        else       -> "F"
    }
    println("Grade: $grade")   // Output: Grade: B

    // ── when with type checks ────────────────────────────────
    fun describe(value: Any): String = when (value) {
        is Int     -> "Integer: $value"
        is String  -> "String of length \${value.length}"
        is Boolean -> if (value) "True!" else "False!"
        is List<*> -> "List with \${value.size} items"
        else       -> "Unknown type"
    }
    println(describe(42))           // Output: Integer: 42
    println(describe("Kotlin"))     // Output: String of length 6
    println(describe(listOf(1,2,3)))// Output: List with 3 items

    // ── when with NO argument — works like if/else chain ─────
    val x = 15
    when {
        x < 0    -> println("negative")
        x == 0   -> println("zero")
        x < 10   -> println("small positive")
        else     -> println("large positive")   // Output: large positive
    }
}`,
      },
      {
        type: 'paragraph',
        text: 'Kotlin has three loop constructs. The `for` loop iterates over ranges and collections. `while` and `do-while` loop based on a condition, and `break`/`continue` give fine-grained control.',
      },
      {
        type: 'code',
        title: 'Loops — for, while, do-while',
        code: `fun main() {

    // ── for loop over a range ─────────────────────────────────
    // 1..5 is a closed range: 1, 2, 3, 4, 5 (inclusive on both ends)
    for (i in 1..5) {
        print("$i ")        // Output: 1 2 3 4 5
    }
    println()

    // until creates a half-open range — excludes the end value
    for (i in 0 until 5) {
        print("$i ")        // Output: 0 1 2 3 4  (5 excluded)
    }
    println()

    // downTo counts backwards; step controls the increment size
    for (i in 10 downTo 1 step 3) {
        print("$i ")        // Output: 10 7 4 1
    }
    println()

    // ── for loop over a collection ────────────────────────────
    val fruits = listOf("Apple", "Banana", "Cherry")
    for (fruit in fruits) {
        println(fruit)      // Prints each fruit on its own line
    }

    // withIndex() gives you both index and value at once
    for ((index, fruit) in fruits.withIndex()) {
        println("$index: $fruit")   // 0: Apple, 1: Banana, 2: Cherry
    }

    // ── while loop ────────────────────────────────────────────
    // Checks condition BEFORE each iteration.
    var count = 0
    while (count < 3) {
        println("while: count = $count")
        count++
    }

    // ── do-while loop ─────────────────────────────────────────
    // Runs the body AT LEAST ONCE, then checks condition.
    var x = 0
    do {
        println("do-while: x = $x")   // always runs at least once
        x++
    } while (x < 3)

    // ── break and continue ────────────────────────────────────
    for (i in 1..10) {
        if (i == 4) continue    // skip 4, jump to next iteration
        if (i == 7) break       // stop the loop entirely when i is 7
        print("$i ")            // Output: 1 2 3 5 6
    }
    println()
}`,
      },
      {
        type: 'note',
        text: 'In Kotlin, `if` and `when` both return a value. Because of this, Kotlin has no ternary operator (`?:` is reserved for the Elvis null-safety operator you\'ll learn about next). Get into the habit of treating `if/when` as expressions.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5 — Null Safety
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'null-safety',
    title: 'Null Safety',
    level: 'Beginner',
    description:
      'Learn how Kotlin eliminates NullPointerExceptions at compile time with nullable types, safe calls, the Elvis operator, and scoped null checks.',
    blocks: [
      {
        type: 'paragraph',
        text: 'The NullPointerException (NPE) has been called the "billion-dollar mistake" — it crashes programs when code unexpectedly encounters a null value. In Java and many other languages, ANY variable can be null at any time, making it impossible for the compiler to help. Kotlin solves this at the type-system level: a type is either **nullable** or **non-nullable**, and the compiler enforces this distinction.',
      },
      {
        type: 'code',
        title: 'Nullable Types',
        code: `fun main() {

    // ── Non-nullable (default) ────────────────────────────────
    // By default, Kotlin types CANNOT hold null.
    // This is the opposite of Java's behavior!
    var name: String = "Alice"
    // name = null   // COMPILE ERROR — String is non-nullable

    // ── Nullable types — add ? after the type name ────────────
    // A nullable type can hold either a value OR null.
    var maybeNull: String? = "Hello"
    maybeNull = null    // OK — String? allows null
    maybeNull = "World" // OK — String? also allows real values

    // ── The compiler tracks nullability ──────────────────────
    // If you try to call a method on a nullable variable without
    // checking for null first, you get a compile error — not a crash!
    val city: String? = null
    // println(city.length)   // COMPILE ERROR: smart cast impossible
                              // city could be null!

    // ── Smart cast — the compiler learns from null checks ─────
    val input: String? = "Kotlin"
    if (input != null) {
        // Inside this block the compiler KNOWS input is not null.
        // It automatically smart-casts to String (non-nullable).
        println(input.length)   // OK! Output: 6
    }

    // ── Null check with else ───────────────────────────────────
    val length: Int = if (city != null) city.length else 0
    println("Length: $length")   // Output: Length: 0
}`,
      },
      {
        type: 'paragraph',
        text: 'Kotlin provides concise operators to work with nullable types safely, without writing verbose null checks every time.',
      },
      {
        type: 'code',
        title: 'Safe Call (?.), Elvis (?:), and let',
        code: `fun main() {

    // ── Safe call operator ?. ─────────────────────────────────
    // Calls the method/property ONLY if the receiver is not null.
    // Returns null instead of throwing an NPE.
    val name: String? = null
    val upper = name?.uppercase()   // upper = null (no crash!)
    println(upper)                  // Output: null

    val actual: String? = "kotlin"
    println(actual?.uppercase())    // Output: KOTLIN

    // Chain multiple safe calls — stops at the first null
    data class Address(val city: String?)
    data class User(val address: Address?)
    val user: User? = User(Address("London"))
    val city = user?.address?.city   // chain: User? -> Address? -> String?
    println(city)                    // Output: London

    // ── Elvis operator ?: ──────────────────────────────────────
    // Provides a default value when the left side is null.
    // Reads as: "use X, or if X is null, use Y"
    val name2: String? = null
    val displayName = name2 ?: "Guest"   // null on left → use right side
    println(displayName)                 // Output: Guest

    val realName: String? = "Alice"
    println(realName ?: "Guest")         // Output: Alice (not null, use it)

    // Elvis with safe call — very common pattern:
    val len = name2?.length ?: 0         // if name2 is null, length is 0
    println("Length: $len")              // Output: Length: 0

    // Elvis can also throw an exception as its right side:
    fun requireName(n: String?): String {
        return n ?: throw IllegalArgumentException("Name cannot be null!")
    }

    // ── let for null-safe scoping ─────────────────────────────
    // ?.let { } runs the lambda ONLY when the value is not null.
    // Inside the lambda, 'it' is the non-null value (smart cast).
    val email: String? = "alice@example.com"
    email?.let {
        // 'it' is String here (not String?), so .uppercase() is safe
        println("Email: \${it.uppercase()}")   // Output: Email: ALICE@EXAMPLE.COM
    }

    val noEmail: String? = null
    noEmail?.let {
        println("This never runs because noEmail is null")
    }
}`,
      },
      {
        type: 'code',
        title: 'Not-Null Assertion (!!) and lateinit',
        code: `// ── Not-null assertion !! ────────────────────────────────────
// !! tells the compiler "I KNOW this is not null — trust me".
// If you are wrong, you GET a NullPointerException at runtime.
// Use sparingly, and only when you are absolutely certain.
fun findUser(id: Int): String? {
    return if (id == 1) "Alice" else null
}

fun main() {
    val user = findUser(1)!!   // Alice is non-null, so !! is safe here
    println(user.uppercase())  // Output: ALICE

    // val bad = findUser(99)!!  // DANGER: throws NullPointerException at runtime!

    // ── lateinit — delay initialization of non-nullable vars ─
    // Sometimes you can't initialize a variable immediately
    // (e.g., dependency injection, Android Views, test setup).
    // lateinit lets you declare it non-nullable and init it later.
    // Only works with 'var' and reference types (not Int, Boolean, etc.)
    lateinit var database: String

    // Accessing database here would throw UninitializedPropertyAccessException

    database = "PostgreSQL"    // initialise before use
    println("DB: $database")   // Output: DB: PostgreSQL

    // You can check if a lateinit var has been initialised:
    if (::database.isInitialized) {
        println("Database is ready: $database")
    }
}`,
      },
      {
        type: 'note',
        text: 'The goal is to keep `!!` out of your code entirely. If you find yourself reaching for it, step back and ask: "Can I restructure this code so the null is handled upstream?" Usually you can use `?.`, `?:`, or `let` instead.',
      },
    ],
  },
];
