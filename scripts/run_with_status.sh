#!/bin/bash -e

run_with_status() {
    local description="$1"
    shift  # Remove the first argument, leaving only the command and its arguments

    # Print the description to stderr
    echo -n "$description... " >&2

    # Execute the command, capturing both stdout and stderr.
    # Use a temporary file to capture the output
    local temp_file=$(mktemp)
    if ! "$@" >"$temp_file" 2>&1; then
        # If the command fails, indicate an error and show the output
        echo "error." >&2
        echo "" >&2
        cat "$temp_file" >&2
        rm -f "$temp_file"
        return 1
    else
        # If the command succeeds, indicate completion
        echo "done." >&2
        rm -f "$temp_file"
        return 0
    fi
}