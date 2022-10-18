# @talend coral renderer for jsonforms

This package provide a renderer based on `@talend/design-system`

To contribute to the lib please first read https://jsonforms.io/docs/tutorial/custom-renderers/

## renderer set

| JSON Schema         | Renderer          | Status |
| ------------------- | ----------------- | ------ |
| boolean             | checkbox          |        |
|                     | toggle            |        |
| integer             | number            |        |
|                     | tel               |        |
| string              | text              |        |
|                     | textarea          |        |
| enum                | combo             |        |
|                     | autocomplete      |        |
| oneof (const/title) | combo             |        |
|                     | autocomplete      |        |
| date format         | date              |        |
| time format         | time              |        |
| datetime format     | datetime          |        |
| object              | vertical grid     |        |
| array of primitives | list              |        |
| array of objects    | table             |        |
|                     | list              |        |
|                     | list with details |        |
| array of enum       | multiple choices  |        |
| oneof               | tabs              |        |
| allOf               | tabs              |        |
| anyOf               | tabs              |        |

| UI schema       | Renderer      | status |
| --------------- | ------------- | ------ |
| vertical layout | vertical grid |        |
| categorization  | tabs          |        |
| group           | group         |        |
| label           | text          |        |
