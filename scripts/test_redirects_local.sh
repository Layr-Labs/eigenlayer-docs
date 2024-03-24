#!/bin/bash -e

source ./ci-scripts/run_with_status.sh

REPO_TOP_LEVEL=$(git rev-parse --show-toplevel)

# Fetch the latest state of origin/main
run_with_status "Fetching origin" git fetch origin main

# Find the merge-base of the current branch and origin/main
MERGE_BASE=$(git merge-base origin/main @)

# echo "Merge base of origin/main and $CURRENT_BRANCH is $MERGE_BASE"

# Generate a random worktree path
WORKTREE_PATH="/tmp/pr_worktree_$(date +%Y%m%d%H%M%S)_$RANDOM"

# Ensure the worktree path is unique and does not already exist
if [ -d "$WORKTREE_PATH" ]; then
    echo "Worktree directory already exists. Please try again."
    exit 1
fi

# Create a new worktree for the merge-base in the temporary directory
run_with_status "Creating worktree" git worktree add "$WORKTREE_PATH" $MERGE_BASE

# Change directory to the worktree
cd "$WORKTREE_PATH"

run_with_status "Linking dependencies" yarn

# Run the script to generate the routes_to_test.txt
./ci-scripts/gen_routes.sh > routes_to_test.txt

# Move the routes_to_test.txt back to the original repo directory
run_with_status "Copying routes" mv routes_to_test.txt "$REPO_TOP_LEVEL"

# Clean up the worktree and return to the original repository directory
run_with_status "Removing worktree" git worktree remove "$WORKTREE_PATH"
cd - &>/dev/null

# The current repo state is now the target for tests
# Run the tests with the routes file in the current state of the repository
set +e
./ci-scripts/test_redirects.sh routes_to_test.txt
TEST_REDIRECTS_EXIT_CODE=$?
set -e

rm routes_to_test.txt
