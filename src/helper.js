import './helper.css'

export const ytIsChanel = 'youtube#channel'
export const ytIsPlaylist = 'youtube#playlist'
export const ytIsVideo = 'youtube#video'

export const collapse = (collapseSection) => {
  if (collapseSection) {
    if (collapseSection.classList.contains('show')) {
      // collapse
      const height = collapseSection.offsetHeight
      collapseSection.style.height = height + 'px'
      collapseSection.classList.add('collapsing')

      window.setTimeout(() => {
        collapseSection.style.height = 0
      }, 1)

      window.setTimeout(() => {
        collapseSection.classList.remove('show')
        collapseSection.classList.remove('collapsing')
        collapseSection.style.height = null
      }, 350)
    } else {
      // expand
      collapseSection.style.display = 'block'
      const height = collapseSection.offsetHeight
      collapseSection.classList.add('collapsing')

      window.setTimeout(() => {
        collapseSection.style.height = height + 'px'
      }, 1)

      window.setTimeout(() => {
        collapseSection.classList.add('show')
        collapseSection.classList.remove('collapsing')
        collapseSection.style.display = null
        collapseSection.style.height = null
      }, 350)
    }
  }
}

export function checkLeapYear(year) {
  if (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  ) {
    return true
  }
  return false
}

export function checkLastDate(m, y) {
  let lastDay = 30
  if (m === 2) {
    if (checkLeapYear(y)) {
      lastDay = 29
    } else {
      lastDay = 28
    }
  } else if (
    m === 1 ||
    m === 3 ||
    m === 5 ||
    m === 7 ||
    m === 8 ||
    m === 10 ||
    m === 12
  ) {
    lastDay = 31
  } else {
    lastDay = 30
  }
  return lastDay
}

export function mapKeysYoutubeVideo(data) {
  const newData = {}
  if (typeof data === 'object' && data.length !== undefined) {
    let isKeyExist = false
    let key = ''
    if (data[0].id) {
      for (const k in data[0].id) {
        if (k === 'videoId' || k === 'channelId' || k === 'playlistId') {
          // other id should come here
          key = k
          isKeyExist = true
          break
        }
      }
    }
    // start map keys
    if (isKeyExist) {
      for (let i = 0; i < data.length; i++) {
        newData[data[i].id[key]] = data[i]
      }
    }
  }
  return newData
}

// convert string time format to time with '... y ago'
export function convertTime(time) {
  const token = 'ago'
  const aYear = 365 * 24 * 60 * 60 // 31536000 second
  const aMonth = 30 * 24 * 60 * 60 // 2592000 second
  const aDay = 24 * 60 * 60 // 86400 second
  const aHour = 60 * 60 // 3600 second
  const aMinute = 60 // 60 second

  var interval = ''
  var stringTime = time.replace('T', ' ').replace('Z', '') // time is format 'YYYY-MM-DD T HH:MM:SSZ'
  var targetDate = new Date(stringTime) // target Date

  var seconds = Math.floor((new Date() - targetDate) / 1000)

  interval = Math.floor(seconds / aYear)
  if (interval > 1) {
    return `${interval} years ${token}`
  }

  interval = Math.floor(seconds / aMonth)
  if (interval > 1) {
    return `${interval} months ${token}`
  }

  interval = Math.floor(seconds / aDay)
  if (interval > 1) {
    return `${interval} days ${token}`
  }

  interval = Math.floor(seconds / aHour)
  if (interval > 1) {
    return `${interval} hours ${token}`
  }

  interval = Math.floor(seconds / aMinute)
  if (interval > 1) {
    return `${interval} minutes ${token}`
  }

  return `${Math.floor(seconds)} second ${token}`
}

export function converNumberLike(number) {
  if (number > 1000) {
    number = number / 1000
    return number.toFixed(1) + 'K'
  }
  return number
}

export function getVideoDetail(video) {
  return {
    id: video.id,
    kind: video.kind,
  }
}

export function getTimeZoneType() {
  const d = new Date()
  const n = d.getTimezoneOffset()
  let timeZoneType = ''

  if (n < 0) {
    timeZoneType = `+0${-(n / 60)}:00`
  } else if (n > 0) {
    timeZoneType = `-0${n / 60}:00`
  } else {
    timeZoneType = '+00:00'
  }
  return timeZoneType
}
