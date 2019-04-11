import moment from 'moment'

import { color } from '../Style/Color'

const getXAxisDataPoint = (
  groupBy: string,
  date: string,
  index: number
): string => {
  switch (groupBy) {
    case 'DAILY':
      return moment(date).format('ddd')
    case 'MONTHLY':
      return moment(date).format('MMM')
    case 'YEARLY':
      return moment(date).format('YYYY')
    case 'WEEKLY':
      return `Week ${index + 1}`
  }
  return moment(date).format('ddd')
}

export const evaluateDataPoints = (
  groupBy: string,
  dataPoints: [{ date: string; total: number }]
): { labels: any[]; datasets: any[] } => {
  let labels = [],
    datasets = [{ data: [], color: () => color.blue, strokeWidth: 2 }]

  dataPoints.forEach((point, i) => {
    labels.push(getXAxisDataPoint(groupBy, point.date, i))
    datasets[0].data.push(Number(point.total))
  })
  return { labels, datasets }
}

export const getName = title => {
  let productName = title.length < 35 ? title : `${title.substring(0, 20)}...`
  return productName
}
