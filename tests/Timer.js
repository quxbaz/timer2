import expect from 'expect'
import Timer from 'timer2'
import {threadStr} from 'timer2/lib/test-thread'
import {now} from 'timer2/lib/util'

const TestTimer = (state) => new Timer({
    ...state,
    threadStr,
})

describe('Timer', () => {

  it("Creates a Timer object.", () => {
    new Timer()
  })

  it("Listens to a timer for 10 ticks.", (done) => {
    const t = new Timer({tickInterval: 1})
    let i = 0
    t.on('tick', () => {
      i++
      if (i === 10) {
        expect(t.tickCount).toEqual(10)
        t.stop()
        done()
      }
    }).start()
  })

  it("Stops a timer.", (done) => {
    const t = new Timer({tickInterval: 1})
    let i = 0
    t.on('tick', () => {
      i++
      if (i === 5) {
        t.stop()
        setTimeout(() => {
          done()
        }, 50)
      } else if (i === 6)
        throw new Error('Timer should have stopped.')
    }).start()
  })

  it("Starts and stops a timer.", (done) => {
    const t = new Timer({tickInterval: 1})
    let i = 0
    t.on('tick', () => {
      i++
      if (i === 5) {
        t.stop()
        setTimeout(() => {
          t.start()
        }, 10)
      } else if (i === 10) {
        t.stop()
        done()
      }
    }).start()
  })

})
