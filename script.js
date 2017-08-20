function ev(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }
  }

  //printResults(graph, population, graphType);

  return population;

}

function evc(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let parent1Position = _.random(populationSize - 1)
    let parent2Position = _.random(populationSize - 1)
    let parent1 = population[parent1Position];
    let parent2 = population[parent2Position];
    let child = cross(parent1, parent2)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }

    if (fit(child, graph) > fit(parent1, graph)) {
        population[parent1Position] = child
    }
    else if (fit(child, graph) > fit(parent2, graph)) {
      population[parent2Position] = child
    }
  }

  printResults(graph, population, graphType);

}

function eva(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutateA(toBeMutated, (generations - i + 1)/generations)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }
  }

  printResults(graph, population, graphType);

}

function evac(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutatedPosition = _.random(populationSize - 1)
    let parent1Position = _.random(populationSize - 1)
    let parent2Position = _.random(populationSize - 1)
    let parent1 = population[parent1Position];
    let parent2 = population[parent2Position];
    let child = cross(parent1, parent2)
    let toBeMutated = population[ toBeMutatedPosition ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutateA(toBeMutated, (generations - i + 1)/generations)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
    {
       population[contenderPosition] = mutated
    }

    if (fit(child, graph) > fit(parent1, graph)) {
        population[parent1Position] = child
    }
    else if (fit(child, graph) > fit(parent2, graph)) {
      population[parent2Position] = child
    }
  }

  printResults(graph, population, graphType);
}

function evacnm(n, m, graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    for (let j = 0; j <= n; j++) {
      let toBeMutatedPosition = _.random(populationSize - 1)
      let parent1Position = _.random(populationSize - 1)
      let parent2Position = _.random(populationSize - 1)
      let parent1 = population[parent1Position];
      let parent2 = population[parent2Position];
      let child = cross(parent1, parent2)
      let toBeMutated = population[ toBeMutatedPosition ]
      let mutated = mutateA(toBeMutated, (generations - i + 1)/generations)

      for (let k = 0; k < m; k++) {
        let contenderPosition = _.random(populationSize - 1)
        if(fit(mutated, graph) > fit(population[contenderPosition], graph))
        {
           population[contenderPosition] = mutated;
           break;
        }
      }

      if (fit(child, graph) > fit(parent1, graph)) {
          population[parent1Position] = child
      }
      else if (fit(child, graph) > fit(parent2, graph)) {
        population[parent2Position] = child
      }

    }
  }

  printResults(graph, population, graphType);

}

function memetic(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){

      let toBeImprovedPosition = _.random(populationSize - 1)
      let parent1Position = _.random(populationSize - 1)
      let parent2Position = _.random(populationSize - 1)
      let parent1 = population[parent1Position];
      let parent2 = population[parent2Position];
      let child = cross(parent1, parent2)
      let toBeImproved = population[ toBeImprovedPosition ]
      let improved = improve(toBeImproved, graph)

      population[toBeImproved] = improved;

      if (fit(child, graph) > fit(parent1, graph)) {
          population[parent1Position] = child
      }
      else if (fit(child, graph) > fit(parent2, graph)) {
        population[parent2Position] = child
      }
  }

  printResults(graph, population, graphType);

}

const improve = (individual, adjacencyMatrix) =>{

  let improved = individual.concat();
  let colours = getColoursIndividual(individual);

  for (let i = 0; i < individual.length; i++) {
    let attempt = individual.concat();
    for (let colour of colours) {
      attempt[i] = colour;
      if (isValidColouring(attempt, adjacencyMatrix, i)) {
        improved = attempt
        break;
      }
    }
  }
  return improved;
}

const improve2 = (individual, adjacencyMatrix) =>{

  let improved = individual.concat();
  let colours = getColoursIndividual(individual);

  for (let i = 0; i < individual.length; i++) {
    let attempt = individual.concat();
    for (let colour of colours) {
      attempt[i] = colour;
      if (isValidColouring(attempt, adjacencyMatrix, i)) {
        improved = attempt
        break;
      }
    }
  }
  return improved;
}

const getColoursIndividual = (individual) => {
  let colours = new Set();
  for (let colour of individual) {
     colours.add(colour);
  }
  return colours;
}

const getArrayColoursUsed = (population) => {
  let array = [];
  for (let individual of population) {
     array.push(getColoursIndividual(individual).size);
  }
  return array;
}

const isValidColouring = (individual, adjacencyMatrix, node) => {
    for (let i = 0; i < individual.length; i++) {
       if (adjacencyMatrix[node][i] === 1 && individual[i] === individual[node]) {
            return false;
       }
    }
    return true;
}

const searchForTheBest = (individual, adjacencyMatrix, depth, ) =>{

  let best;



  return best;

}

const printResults = (graph, population, graphType) =>
{
  let bucket = document.getElementById("wrapper");
  bucket.innerHTML += `<h1>${graphType}</h1>`

  for (let i = 0; i < population.length; i++) {
    let aux = "";
    individual = population[i];
    let fitness = fit(individual,graph);
    aux += `<p ${fitness === -1 ? "style=\"color:#f46b42;\"": ""}>Individual <b>${i+1}: &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Fitness: <b>${fitness} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Colours used: <b>${totalColoursUsed(individual)} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    /*for (let j = 0; j < individual.length; j++) {
       aux += `${individual[j]}, `
    }*/
    aux += `</p>`;
    bucket.innerHTML += aux;
  }

  bucket.innerHTML += `<br/>`

}

const hasClashes = (graph, individual) =>{

  let graphOrder = graph.length

  for (let i = 0; i < graphOrder; i++) {
    for (let j = 0; j < graphOrder; j++) {
        if(graph[i][j] === 1 && individual[i] === individual[j]) return true;
    }
  }

  return false;
}

const totalColoursUsed = (individual) => {

  let colours = new Set();

  for (let colour of individual) {
     colours.add(colour)
  }
  return colours.size
}

const fit = (individual, adjacencyMatrix) => {
     let clashes = hasClashes(adjacencyMatrix, individual)
     if (clashes) {
       return -1;
     }
     else {
        let coloursUsed = totalColoursUsed(individual)
        return adjacencyMatrix.length - coloursUsed;
     }
}

const getColours = (numberOfColours) => {
  let colours = []

  // generate an array with as many colours as the graph order
  for (let j = 1; j <= numberOfColours; j++){
    colours.push(j*100);
   }

   return colours;
}

const mutate = (individual) =>{
  let mutated = individual.concat();
  mutated[ _.random(mutated.length -1) ] = individual[ _.random(mutated.length -1)]
  return mutated;
}

const mutateA = (individual, s) =>{
  let mutated = individual.concat();
  let rate = Math.round((individual.length)/2 * s)

  for (let i = 0; i < rate; i++) {
    mutated[ _.random(mutated.length -1) ] = individual[ _.random(mutated.length -1)]
  }

  return mutated;
}

const cross = (individual1, individual2) =>{

  let partitionIndex = _.random(individual1.length -1);
  let coinFlip = _.random(0,1);

  if (coinFlip) {
    return individual1.slice(0, partitionIndex + 1).concat(individual2.slice(partitionIndex , individual2.length - 1))
  }
  else {
    return individual2.slice(0, partitionIndex + 1).concat(individual1.slice(partitionIndex , individual1.length - 1))
  }

}

const generateInitialPopulation = (graphOrder, populationSize) => {

   const individuals = []

   for(let i = 1; i <= populationSize; i++){

     let individual = [];

     let colors = getColours(graphOrder);

     for (let k = 0; k < graphOrder; k++) {
         const color = colors.splice( _.random(colors.length-1), 1 )
         individual.push(color[0]);
     }

     individuals.push(individual)

   }

   return individuals
}

const petersen = [
  [0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 1, 0, 0]
];

const crown = [
  [0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0]
];

const wheel = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];

const printSummary = (graph, population, generations, graphType, fn) =>{

  let all =[]
  for (let i = 0; i < 10; i++) {
    all = all.concat(fn(graph, population, generations, graphType));
  }

  let byColoursUsed = getArrayColoursUsed(all)
  let median = math.median(byColoursUsed);
  let min = math.min(byColoursUsed);
  let std = math.std(byColoursUsed);

  let bucket = document.getElementById("wrapper");
  bucket.innerHTML += `<h1>${graphType}</h1>`
  bucket.innerHTML += `<p>Median: ${median}</p>`
  bucket.innerHTML += `<p>Min: ${min}</p>`
  bucket.innerHTML += `<p>Standand Deviation: ${std}</p>`

}


printSummary(crown, 10, 200, "Crown (8)", ev)
printSummary(petersen, 10, 200, "Petersen (8)", ev)
printSummary(wheel, 10, 200, "Wheel (8)", ev)

//evc(crown, 10, 200, "Crown (8)")
//ev(petersen, 10, 200, "Petersen (10)")
//ev(wheel, 10, 200, "Wheel (12)")

 //evc(crown, 10, 1500, "Crown (8)")
 //evc(petersen, 10, 1500, "Petersen (10)")
 //evc(wheel, 10, 1500, "Wheel (12)")

 //eva(crown, 10, 300, "Crown (8)")
 //eva(petersen, 10, 300, "Petersen (10)")
 //eva(wheel, 10, 300, "Wheel (12)")

 //evac(crown, 10, 250, "Crown (8)")
 //evac(petersen, 10, 300, "Petersen (10)")
 //evac(wheel, 10, 300, "Wheel (12)")

 //evacnm(3, 3, crown, 10, 100, "Crown (8)")
 //evacnm(3, 3, petersen, 10, 120, "Petersen (10)")
 //evacnm(3, 3, wheel, 10, 120, "Wheel (12)")

 //memetic(crown, 10, 50, "Crown (8)");
 //memetic(petersen, 10, 50, "Petersen (10)")
 //memetic(wheel, 10, 50, "Wheel (12)")
