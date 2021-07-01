const prompts = require('prompts')

// TODO 自定义 debug 模式是否开启
async function prompt() {
  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Choose an environment?',
    choices: [
      { title: 'dev', description: 'This option defaults the browser h5 environment', value: 0 },
      { title: 'h5', description: 'This option is h5 environment', value: 1 },
      { title: 'wx', description: 'This option is the WeChat mini game environment', value: 2 }
    ],
    initial: 0
  })
  const type = response.value
  const { input, output } = require('./configs')[type]
  return Object.assign({}, input, { output })
}

module.exports = prompt()
