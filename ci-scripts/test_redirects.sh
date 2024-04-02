#!/bin/bash -e

source ./ci-scripts/run_with_status.sh

# Display usage information
usage() {
    echo "Usage: $0 <filename>"
    echo
    echo "This script tests that each of the old pages redirects properly to a new page."
    echo "It requires a file containing URLs to test, one per line."
    echo
    echo "Usage pattern:"
    echo "1. Switch from new branch to old branch"
    echo "2. Generate routes get_routes.sh > routes_to_test.txt"
    echo "3. Switch from old branch to new branch (bringing routes_to_test.txt over)"
    echo "4. Run $0 routes_to_test.txt"
    echo ""
    echo "This script tests that each of the old pages redirects properly to a new page."
    echo "It does not test that this is the correct new page however."
    exit 1
}

# Ensure server is killed on script exit
cleanup() {
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null || echo "Server process not found."
    else
        echo "No server was started."
    fi
}

# Variable to track test failure
any_fail=0


# Check for help option or no argument
if [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]] || [ "$#" -ne 1 ]; then
    usage
fi


# Absolute path to the filename
FILENAME=$(realpath "$1")

# Ensure file exists
if [ ! -f "$FILENAME" ]; then
    echo "File not found: $FILENAME" >&2
    exit 1
fi

# Build the project and start the server

run_with_status "Building new site" yarn build
printf "Starting server... "
./node_modules/.bin/docusaurus serve --no-open &>/dev/null &
SERVER_PID=$!
# Wait a bit for the server to start
sleep 5
printf "done.\n"

# Setup trap to clean up on script exit
trap cleanup EXIT

echo ""
echo "Begining tests"
echo ""
while IFS= read -r url; do
    full_url="http://localhost:3000${url}"
    # Perform a curl request and check both for "Page Not Found" and curl's exit status
    if ! curl_output=$(curl -fs "$full_url" 2>&1); then
        # Curl command failed
        printf "\033[31mFAIL\033[0m: %s\n" "$full_url" >&2
        any_fail=1
    else
        # If curl succeeded and "Page Not Found" not in output, mark test as passed
        printf "\033[32mPASS\033[0m: %s\n" "$full_url"
    fi
done < "$FILENAME"

# Exit with status code 1 if any test failed
if [ "$any_fail" -eq 1 ]; then
    echo ""
    printf "\033[31mOne or more tests failed!\033[0m\n"
    exit 1
else
    echo ""
    printf "\033[32mAll tests passed!\033[0m\n"
    exit 0
fi
