const ORIGINS = [
  'http://localhost',
  /http:\/\/localhost:\d+/,
  'https://todo-or-not-todo-5b704.web.app',
  'https://todo-or-not-todo.web.app',
];

export const CONFIG = {
  origin: ORIGINS,
  corsMethods: '*',
  corsAllowedHeaders: '*',
  globalPrefix: 'v1',
};
