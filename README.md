## Project CLI + Node + Rotate Image

![alt text](https://github.com/crisanlucid/cli-exercises/blob/main/assets/rotate_matrix_clockwise.png?raw=true)

### run script

```
node cli.js input.csv > output.csv
```

### run test

```
npm run test
```

### Node CLI script

    ✔ should return a new output is the file exist
    ✔ should show error message if there is no argument as filename
    ✔ should show error message in case the file does not exist
    ✔ should show error message in case of wrong file type
    ✔ should show erros message in case the CSV file has multiple columns
    ✔ should show an error message in case first column is not number
    ✔ should show an error message in case second column is not array
    ✔ should return a rotate the matrix is the file exist
