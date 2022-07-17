const BASE_URL = 'https://mate.academy/students-api';

export const requestTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};
