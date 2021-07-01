const prompts = require('prompts')
const replace = require('@rollup/plugin-replace')
const debug = process.env.DEBUG || false

// TODO 自定义 debug 模式是否开启
async function prompt() {
  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Choose an environment?',
    choices: [
      { title: 'all', description: 'This option defaults the all environment', value: 'all' },
      { title: 'h5', description: 'This option is h5 environment', value: 1 },
      { title: 'wx', description: 'This option is the WeChat mini game environment', value: 2 }
    ],
    initial: 0
  })
  const type = response.value
  if (type === 'all') {
    const configs = require('./configs')
    const outputs = configs.map(item => item.output)
    const { input } = configs[1]
    const initInput = { ...input }
    const index = initInput.plugins.findIndex(item => item.name === 'replace')
    initInput.plugins.splice(index, 1, replace({
      'process.env.NODE_ENV': JSON.stringify(type),
      'process.env.DEBUG': JSON.parse(debug),
      preventAssignment: true
    }))
    return Object.assign({}, initInput, { output: outputs })
  } else {
    const { input, output } = require('./configs')[type]
    return Object.assign({}, input, { output })
  }
}

module.exports = prompt()
