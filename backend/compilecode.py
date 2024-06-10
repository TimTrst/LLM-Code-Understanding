import os
import subprocess
import py_compile


def check_if_compilable(user_input):
    language = 'python'

    # Temporary file to save the code
    file_path = save_code_to_file(user_input, language)

    # Compile the code
    result = compile_and_run(file_path, language)

    # Clean up the temporary file
    os.remove(file_path)
    return result


def save_code_to_file(code, language):
    extension = {
        'python': '.py',
        'c': '.c',
        'cpp': '.cpp',
        'java': '.java'
    }.get(language, '')

    file_path = f'../tmp/temp_code{extension}'

    with open(file_path, 'w') as file:
        file.write(code)
    return file_path


def compile_and_run(file_path, language):
    commands = {
        'python': ['python3', file_path],
    }

    command = ' '.join(commands.get(language, []))

    if not command:
        return {'error': 'Unsupported language'}
    try:
        py_compile.compile(file_path, doraise=True)
        return {'success': 'Compilation successful'}
    except py_compile.PyCompileError as compile_error:
        spliced_error_string = str(compile_error)[29:]

        return {
            'error': 'Compilation unsuccessful',
            'output': spliced_error_string
        }
