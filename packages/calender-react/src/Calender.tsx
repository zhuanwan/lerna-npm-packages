import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Calender.less'
import type { DateT, PropsT } from '../types'
import {
  _classnames,
  getDateList,
  inclinedAngle,
  _dateToString,
  _daysInMonth,
  _timeToDate,
  _verifyDate,
} from './utils'
const weekText = ['日', '一', '二', '三', '四', '五', '六']
const today = _timeToDate(new Date()) // 今天
const slideDistance = 40 //滑动多少就翻页

function Calender(props: PropsT) {
  const {
    defaultCheckedDate,
    dayCheckedCb,
    defaultCheckedRange,
    rangeCheckedCb,
    isRange = false,
  } = props
  const [year, setYear] = useState(2021) // 年
  const [month, setMonth] = useState(2) // 月
  const [weekDay, setWeekDay] = useState<Date>(new Date()) // 日，滑动标识，以这天为基准渲染三月/三周
  const [checkedDay, setCheckedDay] = useState<Date>(_timeToDate(new Date())) // 选中的天
  const [checkedRange, setCheckedRange] = useState<Array<Date | null>>([]) // 选中的时间段

  // 日期二维数组，三月/三周
  const [listData, setListData] = useState<DateT[][]>([])

  // calenderBox 滑动
  const [transitionDuration, setTransitionDuration] = useState(0)

  const [translateX, setTranslateX] = useState(0)
  const calenderBoxRef = useRef<HTMLDivElement>(null)
  const calenderBoxInnerRef = useRef<HTMLDivElement>(null)

  const calenderBoxWidthRef = useRef(0)

  // 实现前后滑动，一次性要渲染三个月/周，中间那个月/周显示，然后左滑或者右滑之后立即加载滑动到的当月/周的数据，并重新渲染三个月/周
  const moveData = useRef({
    pageX: 0,
    pageY: 0,
    distanceX: 0,
    distanceY: 0,
  })

  const isFirstMove = useRef(true) // 是否是第一次move，也就是touchSatart
  const startMovingRef = useRef(false)
  const transitionendFn = useRef<any>(null)
  const [isShowWeek, setIsShowWeek] = useState(false)
  const [triggerDateRender, setTrggerDateRender] = useState(0)

  // 渲染三个月
  const drawMonth = () => {
    const list = []
    const y = weekDay.getFullYear()
    const m = weekDay.getMonth() + 1
    setYear(y)
    setMonth(m)
    for (let i = 0; i < 3; i++) {
      list[i] = getDateList(y, m - 2 + i, checkedDay, isRange, checkedRange)
    }
    setListData(list)
    // 渲染完三个月后把中间的居中显示
    setTransitionDuration(0)
    setTranslateX(-calenderBoxWidthRef.current)

    // 如果选中的日期/开始时间 和当前weekDay是同一月，赋值weekDay=checkedDay/weekDay=checkedRange[0]
    if (isRange) {
      if (
        checkedRange[0]?.getFullYear() === weekDay.getFullYear() &&
        checkedRange[0].getMonth() === weekDay.getMonth()
      ) {
        setWeekDay(checkedRange[0])
      }
    } else {
      if (
        checkedDay.getFullYear() === weekDay.getFullYear() &&
        checkedDay.getMonth() === weekDay.getMonth()
      ) {
        setWeekDay(checkedDay)
      }
    }
  }

  // 渲染三周
  const drawWeek = () => {
    const list = []
    const _year = weekDay.getFullYear()
    const _month = weekDay.getMonth() + 1
    const _date = weekDay.getDate()
    const _day = weekDay.getDay()
    setYear(_year)
    setMonth(_month)
    for (let j = 0; j < 3; j++) {
      let childList = []
      for (let i = 0; i < 7; i++) {
        let d = new Date(_year, _month - 1, _date, 0, 0, 0)
        d.setDate(d.getDate() - 7 * (1 - j) - (_day - i))
        childList[i] = {
          date: d,
          dataDayString: _dateToString(d),
          dates: d.getDate(),
          isToday: +new Date(d) === +today,
          isFirstDay:
            d.getFullYear() - _year === 0 &&
            d.getMonth() + 1 - _month === 0 &&
            d.getDate() === 1,
          isLastDay:
            d.getFullYear() - _year === 0 &&
            d.getMonth() + 1 - _month === 0 &&
            d.getDate() === _daysInMonth(_year, _month),
          isInvalidDay:
            d.getFullYear() - _year != 0 || d.getMonth() + 1 - _month != 0,
          isLessThanToday: d < today,
          active: !isRange && +d - +checkedDay === 0,
          isStartDayChecked:
            isRange && !!checkedRange[0] && +checkedRange[0] - +d === 0,
          isEndDayChecked: !!checkedRange[1] && +checkedRange[1] - +d === 0,
          range:
            isRange &&
            !!checkedRange[0] &&
            !!checkedRange[1] &&
            +d - +checkedRange[0] >= 0 &&
            +checkedRange[1] - +d >= 0,
        }
      }
      list[j] = childList
    }
    setListData(list)
    // 渲染完三个月后把中间的居中显示
    setTransitionDuration(0)
    setTranslateX(-calenderBoxWidthRef.current)
  }

  // 上一年
  const doLastYear = () => {
    const newDate = new Date(year - 1, month - 1, 1, 0, 0, 0)
    setWeekDay(newDate)
    setTrggerDateRender(triggerDateRender + 1)
  }

  // 下一个月
  const doNextYear = () => {
    let newDate = new Date(year + 1, month - 1, 1, 0, 0, 0)
    setWeekDay(newDate)
    setTrggerDateRender(triggerDateRender + 1)
  }

  // 上一个月
  const doLastMonth = () => {
    const newDate = new Date(year, month - 2, 1, 0, 0, 0)
    setWeekDay(newDate)
    setTrggerDateRender(triggerDateRender + 1)
  }

  // 下一个月
  const doNextMonth = () => {
    let newDate = new Date(year, month, 1, 0, 0, 0)
    setWeekDay(newDate)
    setTrggerDateRender(triggerDateRender + 1)
  }

  // 上一周
  const doLastWeek = () => {
    const d = weekDay?.setDate(weekDay.getDate() - 7)
    setWeekDay(new Date(d))
    setTrggerDateRender(triggerDateRender + 1)
  }

  // 下一周
  const doNextWeek = () => {
    const d = weekDay?.setDate(weekDay.getDate() + 7)
    setWeekDay(new Date(d))
    setTrggerDateRender(triggerDateRender + 1)
  }

  // 开始翻页(pc端)
  const onMouseDown = (e: React.MouseEvent) => {
    startMovingRef.current = true
    moveData.current = {
      pageX: e.clientX,
      pageY: e.clientY,
      distanceX: 0,
      distanceY: 0,
    }
    // 这里绑定document事件，解决拖动到内容之外松不开问题
    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('mouseup', onMouseUp, false)
  }

  // 翻页中(移动端)
  const onTouchMove = (e: TouchEvent) => {
    setTransitionDuration(0)
    const pageX = e.touches[0].pageX
    const pageY = e.touches[0].pageY

    if (isFirstMove.current) {
      isFirstMove.current = false
      moveData.current = {
        pageX,
        pageY,
        distanceX: 0,
        distanceY: 0,
      }
    } else {
      const distanceX = pageX - moveData.current.pageX
      const distanceY = pageY - moveData.current.pageY

      const ang = inclinedAngle(
        { x: moveData.current.pageX, y: moveData.current.pageY },
        { x: pageX, y: pageY }
      )

      // 当角度是横向时，阻住页面滑动
      if (
        (ang > 0 && ang < 45) ||
        (ang > 315 && ang < 360) ||
        (ang > 135 && ang < 215)
      ) {
        e.preventDefault()
      }

      moveData.current = {
        ...moveData.current,
        distanceX,
        distanceY,
      }

      setTranslateX(-calenderBoxWidthRef.current + distanceX)
    }
  }

  // 翻页中(pc端)
  const onMouseMove = (e: MouseEvent) => {
    if (!startMovingRef.current) {
      return
    }
    const distanceX = e.clientX - moveData.current.pageX
    const distanceY = e.clientY - moveData.current.pageY
    moveData.current = {
      ...moveData.current,
      distanceX,
      distanceY,
    }
    setTransitionDuration(0)
    setTranslateX(-calenderBoxWidthRef.current + distanceX)
  }

  // 结束翻页(移动端)
  const onTouchEnd = () => {
    isFirstMove.current = true
    startMovingRef.current = false
    if (moveData.current.distanceX > slideDistance) {
      // console.log('向左')
      transitionendFn.current = isShowWeek ? doLastWeek : doLastMonth
      setTransitionDuration(400)
      setTranslateX(0)
    } else if (moveData.current.distanceX < -slideDistance) {
      // console.log('向右')
      transitionendFn.current = isShowWeek ? doNextWeek : doNextMonth
      setTransitionDuration(400)
      setTranslateX(-calenderBoxWidthRef.current * 2)
    } else {
      setTransitionDuration(0)
      transitionendFn.current = null
      setTranslateX(-calenderBoxWidthRef.current)
    }

    moveData.current = {
      pageX: 0,
      pageY: 0,
      distanceX: 0,
      distanceY: 0,
    }
  }

  // 结束翻页(pc端)
  const onMouseUp = () => {
    onTouchEnd()
    document.removeEventListener('mousemove', onMouseMove, false)
    document.removeEventListener('mouseup', onMouseUp, false)
  }

  // 滑动结束，开始翻页
  const onTransitionEnd = () => {
    transitionendFn.current?.()
  }

  // 清除当前页/上一页/下一页选定的开始结束时间，以及中间的时间段，
  // 之所以上一页，下一页也清除是因为划过去的时候会开始会显示之前选中的时间，不好看
  // 选中开始结束时间以及中间的时间段
  const selectRange = (
    startDate: Date | null,
    endDate: Date | null,
    list: DateT[][]
  ) => {
    const newList = [...list]
    for (const listItem of newList) {
      for (const item of listItem) {
        item.range = false
        item.isStartDayChecked = false
        item.isEndDayChecked = false

        if (startDate && +item.date - +startDate === 0) {
          item.isStartDayChecked = true
        }
        if (endDate && +item.date - +endDate === 0) {
          item.isEndDayChecked = true
        }

        if (
          startDate &&
          endDate &&
          +item.date - +startDate >= 0 &&
          +item.date - +endDate <= 0
        ) {
          item.range = true
        }
      }
    }
    return newList
  }

  // 选中天
  const dayChecked = (item: DateT) => {
    if (item.isInvalidDay) {
      return
    }

    if (isRange) {
      if (!checkedRange[0] && !checkedRange[1]) {
        item.isStartDayChecked = true
        checkedRange[0] = item.date
      } else if (checkedRange[0] && !checkedRange[1]) {
        if (+item.date - +checkedRange[0] <= 0) {
          checkedRange[0] = item.date
          item.isStartDayChecked = true
        } else {
          checkedRange[1] = item.date
          item.isEndDayChecked = true
        }
      } else if (checkedRange[0] && checkedRange[1]) {
        item.isStartDayChecked = true
        checkedRange[0] = item.date
        checkedRange[1] = null
      }
      setListData(selectRange(checkedRange[0], checkedRange[1], listData))
      rangeCheckedCb && rangeCheckedCb([checkedRange[0], checkedRange[1]])
    } else {
      listData.forEach((j) => {
        j.forEach((v) => {
          if (v.dataDayString === item.dataDayString) {
            v.active = true
          } else {
            v.active = false
          }
        })
      })

      setCheckedDay(_timeToDate(item.date))
      setListData([...listData])
      dayCheckedCb && dayCheckedCb(item)
    }
    setWeekDay(item.date)
  }

  // 切换周/月
  const weekMonthChange = () => {
    const flag = !isShowWeek
    flag ? drawWeek() : drawMonth()
    setIsShowWeek(flag)
  }

  // 初始化
  useLayoutEffect(() => {
    // 一开始设置calenderBox宽度,高度
    const width = calenderBoxRef.current?.clientWidth || 0
    calenderBoxWidthRef.current = width

    if (isRange) {
      // 如果传入了日期时间段，那么按这个开始日期渲染月,否则用今天渲染月
      if (
        defaultCheckedRange &&
        defaultCheckedRange[0] &&
        defaultCheckedRange[1] &&
        _verifyDate(defaultCheckedRange[0]) &&
        _verifyDate(defaultCheckedRange[1]) &&
        +defaultCheckedRange[0] - +defaultCheckedRange[1] < 0
      ) {
        setCheckedRange([
          _timeToDate(defaultCheckedRange[0]),
          _timeToDate(defaultCheckedRange[1]),
        ])
        setWeekDay(defaultCheckedRange[0])
      }
    } else {
      // 如果传入了日期，那么按这个日期渲染月,否则用今天渲染月
      if (defaultCheckedDate && _verifyDate(defaultCheckedDate)) {
        setWeekDay(new Date(defaultCheckedDate))
        setCheckedDay(_timeToDate(new Date(defaultCheckedDate)))
      }
    }
    // 渲染三月/三周
    setTrggerDateRender(triggerDateRender + 1)
  }, [])

  // 渲染三月/三周
  useEffect(() => {
    if (triggerDateRender) {
      isShowWeek ? drawWeek() : drawMonth()
    }
  }, [triggerDateRender])

  useEffect(() => {
    // 因为要计算角度，横滑不影响页面上下滑动，需设置passive
    calenderBoxInnerRef.current?.addEventListener('touchmove', onTouchMove, {
      passive: false,
    })

    return () => {
      calenderBoxInnerRef.current?.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div className="wh-calender">
      <div className="header-box">
        <span className="year-arrow-left" onClick={doLastYear}></span>
        <span className="month-arrow-left" onClick={doLastMonth}></span>
        <div className="header-box-view">
          {year}-{month <= 9 ? '0' + month : month}
        </div>
        <span className="month-arrow-right" onClick={doNextMonth}></span>
        <span className="year-arrow-right" onClick={doNextYear}></span>
      </div>
      <div className="week-box">
        {weekText.map((w) => (
          <div key={w} className="week">
            {w}
          </div>
        ))}
      </div>
      <div
        className={`calender-box ${isShowWeek ? 'up' : ''}`}
        ref={calenderBoxRef}
      >
        <div
          ref={calenderBoxInnerRef}
          className="calender-box-inner"
          onTransitionEnd={onTransitionEnd}
          onMouseDown={onMouseDown}
          onTouchEnd={onTouchEnd}
          style={{
            width: calenderBoxWidthRef.current * 3,
            transform: 'translate3d(' + translateX + 'px, 0, 0)',
            transitionDuration: transitionDuration + 'ms',
          }}
        >
          {listData.map((listItem, i) => (
            <div
              className="item"
              key={i}
              style={{ width: calenderBoxWidthRef.current }}
            >
              {listItem.map((dayObj, j) => (
                <span
                  key={dayObj.dataDayString}
                  className={_classnames('date', {
                    isInvalidDay: dayObj.isInvalidDay,
                    active: dayObj.active,
                    isStartDayChecked: dayObj.isStartDayChecked,
                    isEndDayChecked: dayObj.isEndDayChecked,
                    range: dayObj.range,
                  })}
                  onClick={() => dayChecked(dayObj)}
                  data-date={dayObj.dataDayString}
                >
                  <span
                    className={_classnames('day', {
                      isInvalidDay: dayObj.isInvalidDay,
                      active: dayObj.active,
                      isStartDayChecked: dayObj.isStartDayChecked,
                      isEndDayChecked: dayObj.isEndDayChecked,
                      range: dayObj.range,
                    })}
                  >
                    {dayObj.dates}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="show-week">
        <span
          className={`btn ${isShowWeek ? 'down' : 'up'}`}
          onClick={weekMonthChange}
        ></span>
      </div>
    </div>
  )
}

export default Calender
