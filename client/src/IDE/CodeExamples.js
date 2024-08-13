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
    name: "Binary Search",
    language: "python",
    code: `
def binary_search(arr, x):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return -1
    `
  }
  // Add more recursive code examples here
}

export default recursiveCodeExamples