import os

def combine_project_files(project_root_dir, output_filename="project_content.txt",
                          file_extensions=None):
    if file_extensions is None:
        file_extensions = ['.java','.js','.css','.xml']

    with open(output_filename, 'w', encoding='utf-8', errors='ignore') as outfile:
        for root, _, files in os.walk(project_root_dir):
            for filename in files:
                # Check if the file's extension is in our desired list
                if any(filename.endswith(ext) for ext in file_extensions):
                    filepath = os.path.join(root, filename)
                    try:
                        # Skip binary files that might match an extension (e.g., some XMLs might be binary resources)
                        # You might need to refine this if you encounter issues with specific files
                        if os.path.getsize(filepath) > 0 and not is_binary_file(filepath):
                            outfile.write(f"=== {filepath} ===\n")
                            with open(filepath, 'r', encoding='utf-8', errors='ignore') as infile:
                                outfile.write(infile.read())
                            outfile.write("\n\n") # Add extra newlines for separation
                    except Exception as e:
                        outfile.write(f"=== Error reading {filepath}: {e} ===\n\n")

def is_binary_file(filepath):
    # A simple heuristic to check if a file is likely binary
    # Reads the first 1024 bytes and looks for null bytes
    # Not foolproof, but good enough for most text files
    try:
        with open(filepath, 'rb') as f:
            bytes_read = f.read(1024)
        return b'\0' in bytes_read
    except Exception:
        return True # Assume binary if we can't read it

if __name__ == "__main__":
    # Get the current directory where the script is run (which should be your project root)
    project_root = os.getcwd()
    print(f"Combining files from: {project_root}")
    combine_project_files(project_root)
    print("Done! Content saved to project_content.txt")