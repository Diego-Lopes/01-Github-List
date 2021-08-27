import { RepositoryItem } from "./RepositoryItem";
import "../styles/repositories.scss";
import { useState, useEffect } from "react";

//https://api.github.com/orgs/rocketseat/repos
const repository = {
  name: "unform",
  description: "Forms in React",
  link: "https://github.com/unform/unform",
};
interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]); //criamos uma listagem estado para armazenar os dados do repositório.
  //como estamos iniciamos uma lista iniciamos com array vazia em useState.
  useEffect(() => {
    fetch("https://api.github.com/orgs/rocketseat/repos")
      .then((response) => response.json()) //quando response tiver os dado externo converta para .json
      .then((data) => setRepositories(data)); //aqui passamos o valor de data para setRepositories para acrescentar no repositories
  }, []);

  return (
    <section className="repository-list">
      <h1>lista de repositórios</h1>

      <ul>
        {repositories.map((repository) => {
          return (
            <RepositoryItem key={repository.name} repository={repository} />
          );
        })}
      </ul>
    </section>
  );
}
