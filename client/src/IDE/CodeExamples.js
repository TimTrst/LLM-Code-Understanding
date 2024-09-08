const recursiveCodeExamples = {
  factorial: {
    name: "Factorial",
    language: "python",
    code: `
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
    `
  },
  fibonacci: {
    name: "Fibonacci",
    language: "python",
    code: `
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fibs = fibonacci(n - 1)
        fibs.append(fibs[-1] + fibs[-2])
        return fibs
    `
  },
  binarySearch: {
    name: "Decrement Number",
    language: "python",
    code: `def print_number(number):
    
    # print number
    print(number)

    # stopping condition 
    if number == 0:
        print('Stop Printing') 
    else: 
        # recursive call 
        print_number(number - 1) 
    `
  }
  // Add more recursive code examples here
}

export default recursiveCodeExamples