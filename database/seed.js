 
/* eslint-env node */
import { createClient } from '@supabase/supabase-js'
import { fakerEN_US as faker } from '@faker-js/faker'
// const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

// const seedProjects = async (seedCounts) => {
//   const data = []

//   for (let i = 0; i <= seedCounts; i += 1) {
//     const name = faker.lorem.words(3);

//     const person = {
//       name: name,
//       slug: name.toLocaleLowerCase().replace(/ /g, '-'),
//       status: faker.helpers.arrayElement(['in-progress', 'completed']),
//       collaborators: faker.helpers.arrayElements([1,2,3]),
//     }

//     data.push(person)
//   }

//   const { error } = await supabase.from('projects').insert(data)

//   if (error) {
//     console.log('Error!!', error)
//   }
// }

// await seedProjects(12);
 
/* eslint-env node */

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  )
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

const seedProjects = async (numEntries) => {
  logStep('Seeding projects...')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name: name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      description: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully.')

  return data
}

const seedTasks = async (numEntries, projectsIds) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully.')

  return data
}

const seedDatabase = async (numEntriesPerTable) => {
  const projectsIds = (await seedProjects(numEntriesPerTable)).map((project) => project.id)
  await seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
