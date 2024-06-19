# Test Redirects

The `test_redirects.sh` script tests that each of the old pages redirects properly to a new page. It requires a file containing URLs to test, one per line.

Usage pattern:

1. Switch from working branch to upstream branch
2. Generate routes `ci-scripts/gen_routes.sh > routes_to_test.txt`
3. Switch from upstream branch to working branch (bringing `routes_to_test.txt` over)
4. Run `ci-scripts/test_redirects.sh routes_to_test.txt`

This script tests that each of the old pages redirects properly to a new page.
It does not test that this is the correct new page however.
