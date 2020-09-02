import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [respositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"]
    })

    const repository = response.data

    setRepositories([...respositories, repository])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    const newRepositories = respositories.filter(repository =>
      repository.id !== id
    )

    setRepositories(newRepositories)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repository =>

          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
