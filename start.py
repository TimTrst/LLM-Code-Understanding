
#funktioniert, aber blöd zum debuggen, wenn beide Programme im selben Terminal ausgeben

import os
import subprocess
import platform


def run_command(command):
    process = subprocess.Popen(command, shell=True)
    return process


backend_command = 'cd backend && python server.py' if platform.system() == 'Windows' else ('cd backend && source '
                                                                                        'venv/bin/activate && python '
                                                                                        'server.py')
frontend_command = 'cd client && npm start'

backend_process = run_command(backend_command)
frontend_process = run_command(frontend_command)

backend_process.wait()
frontend_process.wait()
