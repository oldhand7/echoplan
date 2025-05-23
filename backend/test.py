def add(a, b):
    return a + b


class MyClass:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print("Hello," + self.name + "!")

    def is_adult(self):
        return self.age >= 18


def multiply(a, b):
    result = a * b
    return result


def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)


if __name__ == "__main__":
    name = input("Enter your name:")
    age = int(input("Enter your age:"))
person = MyClass(name, age)
person.greet()
print("Adult:", person.is_adult())
x = add(5, 7)
print("Sum is", x)
print("Product:", multiply(3, 4))
print("Factorial of 5:", factorial(5))
