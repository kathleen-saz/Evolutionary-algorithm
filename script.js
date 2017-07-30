function ev(graph, populationSize, generations, graphType){

  const graphOrder = graph[0].length

  const population = generateInitialPopulation(graphOrder, populationSize)

  for(let i=0; i<generations; i++){
    let toBeMutated = population[ _.random(populationSize - 1) ]
    let contenderPosition = _.random(populationSize - 1)
    let mutated = mutate(toBeMutated, 1.0)

    if(fit(mutated, graph) > fit(population[contenderPosition], graph))
       population[contenderPosition] = mutated
  }

  printResults(graph, population, graphType);
}

const printResults = (graph, population, graphType) =>
{
  let bucket = document.getElementById("wrapper");
  bucket.innerHTML += `<h1>${graphType}</h1>`

  for (let i = 0; i < population.length; i++) {
    let aux = "";
    individual = population[i];
    aux += `<p>Individual <b>${i}: &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Fitness: <b>${fit(individual,graph)} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Colours used: <b>${totalColoursUsed(individual)} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;
    aux += `Clashes: <b>${checkCollisions(graph, individual)} &nbsp;&nbsp;&nbsp;&nbsp;</b>`;

    for (let j = 0; j < individual.length; j++) {
       aux += `${individual[j].colour}, `
    }
    aux += `</p>`;
    bucket.innerHTML += aux;
  }

  bucket.innerHTML += `<br/>  `
}

const checkCollisions = (graph, individual) =>{

  //received individual is a colouring table as in [100,200,400]

  let collisions = 0;
  let graphOrder = graph.length

  for (let i = 0; i < graphOrder; i++) {
    for (let j = 0; j < graphOrder; j++) {
        if(graph[i][j] === 1 && individual[i].colour === individual[j].colour) collisions++;
    }
  }

  return collisions/2; //graph is bidirected -- will count collisions * 2, thats why i divide
}

const totalColoursUsed = (individual) => {

  //received individual is a colouring table as in [100,200,400]
  let colours = new Set();

  for (let colour of individual) {
     colours.add(colour)
  }

  return colours.size

}

const fit = (individual, adjacencyMatrix) =>{
     let collisions = checkCollisions(adjacencyMatrix, individual)
     let coloursUsed = totalColoursUsed(individual)
     return coloursUsed - collisions
}

const mutate = (individual, mutationRate) =>{
   individual[ _.random(individual.length -1) ] = individual[ _.random(individual.length -1) ]
   return individual;
}

const generateInitialPopulation = (graphOrder, populationSize) => {

   const individuals = []

   for(let i = 1; i <= populationSize; i++){

     // individual data structure format:
     // [300,500,400]
     let individual = [];

     let colors = []

     // generate an array with as many colours as the graph order
     for (let j = 1; j <= graphOrder; j++) {
          colors.push(j*100)
     }

     for (let k = 0; k < graphOrder; k++) {
         const color = colors.splice( _.random(colors.length-1), 1 )
         individual.push({ colour: color[0] });
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


 ev(crown, 10, 10000, "Crown (8)")
 ev(petersen, 10, 10000, "Petersen (10)")
 ev(wheel, 10, 10000, "Wheel (12)")
