# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Set the SQL script file path relative to the script's directory
SQL_SCRIPT="$SCRIPT_DIR/uhpocms_sql_script.sql"

# Check if the SQL script file exists
if [ -e "$SQL_SCRIPT" ]; then
    echo "The SQL script file exists."
else
    echo "The SQL script file does not exist."
    exit 1
fi

# Change the current drive to D: (assuming you are on Windows Subsystem for Linux)
cd D:

# Check the exit status of the 'cd' command
if [ $? -eq 0 ]; then
    echo "Changed current directory to D: successfully."
else
    echo "Failed to change current directory to D:."
    exit 1  # Exit the script with an error code
fi

# Create the directory structure using 'mkdir -p'
mkdir -p UHPOCMS/institute/ABC_1/logo

# Check the exit status of the 'mkdir' command
if [ $? -eq 0 ]; then
    echo "Directory structure for institute created successfully."
else
    echo "Failed to create directory structure."
    exit 1  # Exit the script with an error code
fi

# Create the directory structure using 'mkdir -p'
mkdir -p UHPOCMS/institute/user_profile/Super_1

# Check the exit status of the 'mkdir' command
if [ $? -eq 0 ]; then
    echo "Directory structure for user created successfully."
else
    echo "Failed to create directory structure."
    exit 1  # Exit the script with an error code
fi


# Specify the program directories to search for psql.exe
PROGRAM_DIRS=("C:/Program Files" "C:/Program Files (x86)")

# Initialize a variable to store the path to psql.exe if found
PSQL=""

# Loop through the program directories and check for psql.exe
for dir in "${PROGRAM_DIRS[@]}"; do
    if [ -x "$dir/PostgreSQL/15/bin/psql.exe" ]; then
        PSQL="$dir/PostgreSQL/15/bin/psql.exe"
        break  # Stop searching once psql.exe is found
    fi
done

# Check if psql.exe was found
if [ -n "$PSQL" ]; then
    echo "PostgreSQL is installed, and psql.exe was found at: $PSQL"
else
    echo "PostgreSQL or psql.exe was not found in the specified directories."
    exit 1
fi


# Run the SQL script using psql
"$PSQL" -U postgres -d postgres -a -f "$SQL_SCRIPT"

# Optionally, check the exit status of psql.exe and provide feedback
if [ $? -eq 0 ]; then
    echo "SQL script executed successfully."
else
    echo "SQL script execution failed."
fi

# Rest of your script goes here

