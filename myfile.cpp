#include <bits/stdc++.h>
using namespace std;

// Function to check if all bottles are filled with only one color each
bool isReached(vector<stack<string>> &bottles) {
    for (auto &st : bottles) {
        if (st.empty()) continue;  // Skip empty bottles
        string color = st.top();
        stack<string> temp = st;    // Copy the stack to avoid modifying the original

        while (!temp.empty()) {
            if (temp.top() != color) return false;
            temp.pop();
        }
    }
    return true;
}

// Function to print the solution moves
void printSolution(const vector<pair<int, int>> &ans) {
    for (const auto &move : ans) {
        cout << "Move from bottle " << move.first + 1 << " to bottle " << move.second + 1 << endl;
    }
}

// Recursive function to solve the bottle game
void bottleGameSolver(vector<stack<string>> &bottles, vector<pair<int, int>> &ans, int depth = 0) {
    const int MAX_DEPTH = 500; // Set a maximum depth to prevent stack overflow

    if (depth > MAX_DEPTH) return; // Stop recursion if depth exceeds MAX_DEPTH

    if (isReached(bottles)) {
        printSolution(ans);  // Print the answer when solution is reached
        exit(0);  // Exit after finding a solution to avoid infinite loops
    }

    for (int i = 0; i < bottles.size(); i++) {
        if (bottles[i].empty()) continue;  // Skip empty bottles
        stack<string> &source = bottles[i];

        for (int j = 0; j < bottles.size(); j++) {
            if (i == j) continue;  // Don't move within the same bottle

            stack<string> &target = bottles[j];

            // Move if target has space and matches the top color or is empty
            if (target.size() < 4 && (target.empty() || target.top() == source.top())) {
                string color = source.top();
                source.pop();
                target.push(color);
                ans.push_back({i, j});

                bottleGameSolver(bottles, ans, depth + 1); // Increase depth

                // Backtrack
                ans.pop_back();
                target.pop();
                source.push(color);
            }
        }
    }
}


int main() {
    // Define the 20 bottles with the specified colors
    vector<stack<string>> bottles(20);

    // Adding colors to each bottle from top to bottom
    bottles[0] = stack<string>({"green", "red", "blue", "red"});
    bottles[1] = stack<string>({"maroon", "skin", "skin", "orange"});
    bottles[2] = stack<string>({"green", "darkblue", "skin", "brown"});
    bottles[3] = stack<string>({"black", "sky", "sky", "white"});
    bottles[4] = stack<string>({"blue", "rama", "maroon", "white"});
    bottles[5] = stack<string>({"darkblue", "black", "skin", "sky"});
    bottles[6] = stack<string>({"popat", "pink", "red", "lightblack"});
    bottles[7] = stack<string>({"lightorange", "popat", "sky", "rama"});
    bottles[8] = stack<string>({"brown", "lightblack", "red", "lightorange"});
    bottles[9] = stack<string>({"darkblue", "orange", "purple", "green"});
    bottles[10] = stack<string>({"pink", "lightblack", "purple", "lightorange"});
    bottles[11] = stack<string>({"maroon", "pink", "rama", "popat"});
    bottles[12] = stack<string>({"white", "black", "lightblue", "popat"});
    bottles[13] = stack<string>({"purple", "lightorange", "pink", "orange"});
    bottles[14] = stack<string>({"lightblack", "purple", "maroon", "rama"});
    bottles[15] = stack<string>({"brown", "darkblue", "green", "black"});
    bottles[16] = stack<string>({"orange", "white", "popat", "blue"});
    bottles[17] = stack<string>({"popat", "popat", "popat", "brown"});
    // Bottle 18 and 19 are empty
    bottles[18] = stack<string>();
    bottles[19] = stack<string>();

    vector<pair<int, int>> ans;
    bottleGameSolver(bottles, ans);

    cout << "No solution found." << endl;  // In case no solution is found

    return 0;
}
