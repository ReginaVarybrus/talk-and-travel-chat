import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
/* styled-components */

/* !!!Додати стилі після затвердження макету!!! */

:root {
  --white-color: #ffffff;
  --red-color: red;
  --button-bgd-color: #3e85f3;
  --color-task-low-priority: #3e85f3;
  --bgc-task-low-priority: #ceeefd;
  --color-task-medium-priority: #f3b249;
  --bgc-task-medium-priority: #fcf0d4;
  --color-task-high-priority: #ea3d65;
  --bgc-task-high-priority: #ffd2dd; 

  --color-success: #33d844;
  --color-error: #d83333;
  --color-info: #569aff;

  --color-grey-2: #fdfdfd;
  --color-grey-3: #f6f6f6;
  --color-grey-4: #f2f2f2;
  --color-grey-5: #dedede;
  --color-grey-6: #c8c8c8;
  --color-grey-7: #9c9c9c;
  --color-grey-8: #6f6f6f;
  --color-grey-9: #5e5e5e;
  --color-grey-10: #434343;
  --color-grey-11: #3d3d3d;
  --color-grey-12: #343434;
  --color-dark: #222222;

  --color-blue-1: #e9f0fb;
  --color-blue-2: #cbdbf4;
  --color-blue-3: #a1bfec;
  --color-blue-4: #76a1e3;
  --color-blue-5: #4c85da;
  --color-brand-blue: #256ad2;
  --color-blue-7: #1f5ab3;
  --color-blue-8: #1a4b95;
  --color-blue-9: #153c78;
  --color-blue-10: #11305e;
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  src: local("Inter Medium"),
        local("Inter-Medium"),
        url("fonts/Inter-Medium.ttf") format("ttf");
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  src: local("Inter SemiBold"),
        local("Inter-SemiBold"),
        url("fonts/Inter-SemiBold.ttf") format("ttf");
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  src: local("Inter Bold"),
        local("Inter-Bold"),
        url("fonts/Inter-Bold.ttf") format("ttf");
  font-display: swap;
}

@font-face {
  font-family: "Coolvetica";
    font-style: italic;
  font-weight: 400;
  src: local("Coolvetica Regular"),
        local("Coolvetica-Regular"),
        url("fonts/Coolvetica-Regular.ttf") format("ttf");
  font-display: swap;
} */

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--outlet-background-color);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li{
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
}

h1,h2,h3,h4,h5,h6,p{
  margin: 0;
  padding: 0;
}

h5 {
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
}

svg{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
p{
  margin: 0;
  padding: 0;
}
`;
