# @talend coral renderer for jsonforms

This package provide a renderer based on `@talend/design-system`

To contribute to the lib please first read https://jsonforms.io/docs/tutorial/custom-renderers/

## renderer set

Current status checked means here but no test (still a POC)

| JSON Schema         | Renderer          | Status |
| ------------------- | ----------------- | ------ |
| boolean             | checkbox          | [x]    |
|                     | toggle            | [x]    |
| integer             | number            | [x]    |
|                     | tel               |        |
| string              | text              | [x]    |
|                     | textarea          | [x]    |
| enum                | combo             | [x]    |
|                     | autocomplete      |        |
| oneof (const/title) | combo             |        |
|                     | autocomplete      |        |
| date format         | date              | [x]    |
| time format         | time              | [x]    |
| datetime format     | datetime          | [x]    |
| object              | vertical grid     | [x]    |
| array of primitives | list              |        |
| array of objects    | table             | [x]    |
|                     | list              |        |
|                     | list with details |        |
| array of enum       | multiple choices  |        |
| oneof               | tabs              |        |
| allOf               | tabs              |        |
| anyOf               | tabs              |        |

| UI schema       | Renderer      | status |
| --------------- | ------------- | ------ |
| vertical layout | vertical grid | [x]    |
| categorization  | tabs          | [x]    |
| group           | group         | [x]    |
| label           | text          | [x]    |
