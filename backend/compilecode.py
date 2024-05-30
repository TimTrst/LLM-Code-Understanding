import subprocess
import py_compile


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
        return {'status': 'success', 'output': 'Compilation successful'}
    except py_compile.PyCompileError as compile_error:
        return {
            'status': 'error',
            'output': str(compile_error)
        }