import React, { Component } from "react";

import { connect } from "react-redux";

import { SkinContext, themes } from "../../skin-context";

import * as h from "../../helper";

import {
  resetFilterList,
  saveFilterList,
  changeFilterParams,
  fetchFilterVideos
} from "../../actions/videos";
import { changeLoadingVideoStatus } from "../../actions/search";

import { Columns, Button } from "react-bulma-components";
import IZButton from "../Buttons";
import {
  FilterWrapper,
  FilterButtonWrapp,
  FilterSectInner,
  SectWrapp,
  SectTitle,
  SectBody,
  SectItem
} from "./styled";

const FilterButton = React.forwardRef((props, ref) => (
  <FilterButtonWrapp ref={ref}>{props.children}</FilterButtonWrapp>
));

class Filter extends Component {
  constructor(props) {
    super(props);
    this.filterButton = React.createRef();
    this.collapseSection = React.createRef();
    this.state = {
      filterList: [],
      isSaveFilterList: false
    };
  }

  turnOffResetFilterList = () => {
    this.props.resetFilterList(false);
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.isResetFilterList) {
      // khi người dùng vừa search ra video thì vào đây
      // để reset lại FilterList
      return {
        filterList: [
          {
            filter: "publishedAfter",
            filterItems: [
              {
                showName: "Last hour",
                name: "",
                parent: { list: 1, index: 0 },
                isIgnore: false,
                ignore: [{ list: 1, items: [0, 1, 1] }]
              },
              {
                showName: "Today",
                name: "",
                parent: { list: 1, index: 0 },
                isIgnore: false,
                ignore: [{ list: 1, items: [0, 1, 1] }]
              },
              {
                showName: "This week",
                name: "",
                parent: { list: 1, index: 0 },
                isIgnore: false,
                ignore: [{ list: 1, items: [0, 1, 1] }]
              },
              {
                showName: "This month",
                name: "",
                parent: { list: 1, index: 0 },
                isIgnore: false,
                ignore: [{ list: 1, items: [0, 1, 1] }]
              },
              {
                showName: "This year",
                name: "",
                parent: { list: 1, index: 0 },
                isIgnore: false,
                ignore: [{ list: 1, items: [0, 1, 1] }]
              }
            ],
            filterName: "UPLOAD DATE",
            indexList: 0,
            indexCurrent: -1
          },
          {
            filter: "type",
            filterItems: [
              {
                showName: "Video",
                name: "video",
                isIgnore: false,
                children: [
                  { list: 0, items: [1, 1, 1, 1, 1] },
                  { list: 2, items: [1, 1] }
                ]
              },
              {
                showName: "Chanel",
                name: "channel",
                isIgnore: false,
                ignore: [
                  { list: 0, items: [1, 1, 1, 1, 1] },
                  { list: 2, items: [1, 1] }
                ]
              },
              {
                showName: "Playlist",
                name: "playlist",
                isIgnore: false,
                ignore: [
                  { list: 0, items: [1, 1, 1, 1, 1] },
                  { list: 2, items: [1, 1] }
                ]
              }
            ],
            filterName: "TYPE",
            indexList: 1,
            indexCurrent: 0
          },
          {
            filter: "videoDuration",
            filterItems: [
              {
                showName: "Short(< 4 minutes)",
                name: "short",
                isIgnore: false,
                parent: { list: 1, index: 0 },
                ignore: [{ list: 1, items: [0, 1, 1] }]
              },
              {
                showName: "Long(> 20 minutes)",
                name: "long",
                isIgnore: false,
                parent: { list: 1, index: 0 },
                ignore: [{ list: 1, items: [0, 1, 1] }]
              }
            ],
            filterName: "DURATION",
            indexList: 2,
            indexCurrent: -1
          },
          {
            filter: "order",
            filterItems: [
              {
                showName: "Relevance",
                name: "relevance",
                isIgnore: false
              },
              {
                showName: "Upload date",
                name: "date",
                isIgnore: false
              },
              {
                showName: "View count",
                name: "viewCount",
                isIgnore: false
              },
              {
                showName: "Rating",
                name: "rating",
                isIgnore: false
              }
            ],
            filterName: "SORT BY",
            indexList: 3,
            indexCurrent: -1
          }
        ]
      };
    } else {
      if (!nextState.isSaveFilterList) {
        return {
          filterList: nextProps.prevFilterList
        };
      }
    }
    return null;
  }

  componentDidMount() {
    const filterButton = this.filterButton.current;
    const collapseSection = this.collapseSection.current;
    filterButton.addEventListener("click", () => {
      h.collapse(collapseSection);
    });
  }

  componentWillUnmount() {
    console.log("unmount");
    const filterButton = this.filterButton.current;
    const collapseSection = this.collapseSection.current;
    if (filterButton) {
      filterButton.removeEventListener("click", () => {
        h.collapse(collapseSection);
      });
    }
  }

  onFilterVideo = async (search, param) => {
    this.props.changeLoadingVideoStatus(true);
    await this.props.fetchFilterVideos(search, param);
    this.props.changeLoadingVideoStatus(false);
  };

  resetIgnore = tempFilterList => {
    for (let i = 0; i < tempFilterList.length; i++) {
      for (let j = 0; j < tempFilterList[i].filterItems.length; j++) {
        tempFilterList[i].filterItems[j].isIgnore = false;
      }
    }
  };

  switchIgnore = (tempFilterList, filterItem, type) => {
    for (let i = 0; i < filterItem.ignore.length; i++) {
      var list = filterItem.ignore[i].list;
      for (let j = 0; j < filterItem.ignore[i].items.length; j++) {
        var item = filterItem.ignore[i].items[j];
        if (item === 1) {
          tempFilterList[list].filterItems[j].isIgnore = type;
        }
      }
    }
  };

  /* 
    Khi click vào một fillter thì những filter phụ thuộc vào nó (children) nếu có
    phải được bật lên dù trước đó nó đang tắt (disabled)
    - parameters:
      - tempFilterList: clone của this.state.filterList
      - filterItem: filter hiện tại mà người dùng click
  */
  turnOffIgnoreFillterHasChildren = (tempFilterList, filterItem) => {
    if (filterItem.children && filterItem.children.length > 0) {
      for (let i = 0; i < filterItem.children.length; i++) {
        const { list } = filterItem.children[i]; // index of list children
        for (let j = 0; j < filterItem.children[i].items.length; j++) {
          const childItem = filterItem.children[i].items[j];
          if (childItem === 1) {
            tempFilterList[list].filterItems[j].isIgnore = false;
          }
        }
      }
    }
  };

  clickFilter = async (filterItem, indexList, index) => {
    if (this.props.isResetFilterList) {
      await this.setState({ isSaveFilterList: true });
      await this.props.resetFilterList(false);
    }

    // check ignore
    if (filterItem.isIgnore === false) {
      const tempFilterList = this.state.filterList.splice("");

      // active class
      tempFilterList[indexList].indexCurrent = index;

      // filter hour
      let resultDate = "";
      if (tempFilterList[indexList].filter === "publishedAfter") {
        const d = new Date();

        let date = d.getDate();
        let month = d.getMonth() + 1;
        const year = d.getFullYear();

        let hour = d.getHours();
        let minute = d.getMinutes();
        let second = d.getSeconds();

        function zeroStart() {
          hour = 0;
          minute = 0;
          second = 0;
        }

        switch (filterItem.showName) {
          case "Last hour":
            hour -= 1;
            if (hour < 0) hour = 23;
            break;
          case "Today":
            zeroStart();
            break;
          case "This week": {
            let day = d.getDay() - 1;
            if (day < 0) day = 6;
            let w = date - day;
            if (w <= 0) {
              let prevMonth = month - 1;
              if (prevMonth === 0) prevMonth = 12;
              const lastDay = h.checkLastDate(prevMonth, year);
              w = lastDay + w;
              month = prevMonth;
            }
            date = w;
            zeroStart();
            break;
          }
          case "This month":
            date = 1;
            zeroStart();
            break;
          case "This year":
            date = 1;
            month = 1;
            zeroStart();
            break;
          default:
            break;
        }
        resultDate = `${year}-${month}-${date}T${hour}:${minute}:${second}${h.getTimeZoneType()}`;
        filterItem.name = resultDate;
      }

      // turn off Ignore of children
      this.turnOffIgnoreFillterHasChildren(tempFilterList, filterItem);

      // reset, turn on Ignore if have Ignore
      if (filterItem.ignore && filterItem.ignore.length > 0) {
        // reset Ignore
        this.resetIgnore(tempFilterList);

        // turn on Ignore
        this.switchIgnore(tempFilterList, filterItem, true);
      }

      // get Property + Value
      const tempParams = { ...this.props.filterParams };
      const paramProperty = tempFilterList[indexList].filter;
      const paramValue = filterItem.name;
      tempParams[paramProperty] = paramValue;

      this.setState({
        filterList: tempFilterList
      });

      // change filter params
      await this.props.changeFilterParams(tempParams);
      // close Filter
      this.filterButton.current.click();
      // save filterList
      this.props.saveFilterList(tempFilterList);
      // call API filter videos
      this.onFilterVideo(this.props.searchValue, this.props.filterParams);
      console.log("this.props.searchValue: ", this.props.searchValue);
      console.log("this.props.filterParams: ", this.props.filterParams);
    } else {
      console.log("you click disabled filter");
    }
  };

  removeFilter = async (filterItem, indexList) => {
    if (this.props.isResetFilterList) {
      await this.setState({ isSaveFilterList: true });
      await this.props.resetFilterList(false);
    }
    var tempFilterList = this.state.filterList.splice("");

    // back ignore
    var tempParams = { ...this.props.filterParams };
    var paramProperty = tempFilterList[indexList].filter;
    var paramValue = filterItem.name;

    if (tempParams[paramProperty] === paramValue) {
      delete tempParams[paramProperty]; // remove params
    }

    if (filterItem.children && filterItem.children.length > 0) {
      var shouldTurnOffActiveParent = false;
      for (let i = 0; i < filterItem.children.length; i++) {
        // tắt thằng cha => nếu thằng con đang active thì không cho tắt
        const list = filterItem.children[i].list;
        const indexChildrenActive = tempFilterList[list].indexCurrent;
        if (filterItem.children[i].items[indexChildrenActive] === 1) {
          // check thằng active có phải con của list cha hay không
          // nếu phải thì không cho tắt
          shouldTurnOffActiveParent = true;
          break;
        }
      }

      if (!shouldTurnOffActiveParent) {
        // được phép tắt active khi không có thằng con nào đang active
        tempFilterList[indexList].indexCurrent = -1;
      }
    } else {
      if (filterItem.parent) {
        var parent =
          tempFilterList[filterItem.parent.list].filterItems[
            filterItem.parent.index
          ];

        // đây là thằng con khi tắt nó thì chưa chắc chắn trả lại ignore
        // => Đi đến thằng cha => kiểm tra nếu số thằng con active = 1 (chính nó) => trả ignore

        var activeChild = 0;
        for (let i = 0; i < parent.children.length; i++) {
          const list = parent.children[i].list;
          const indexChildrenActive = tempFilterList[list].indexCurrent;
          if (parent.children[i].items[indexChildrenActive] === 1) {
            activeChild += 1;
          }
        }

        if (activeChild === 1) {
          if (filterItem.ignore && filterItem.ignore.length > 0) {
            this.switchIgnore(tempFilterList, filterItem, false);
          }
        }
      } else {
        if (filterItem.ignore && filterItem.ignore.length > 0) {
          this.switchIgnore(tempFilterList, filterItem, false);
        }
      }

      // đây là thằng con. Chắc chắn được tắt active
      tempFilterList[indexList].indexCurrent = -1;
    }

    //trường hợp đặc biệt
    if (paramProperty === "type") {
      // nếu tắt filter "type" => trả về filter "type" mặc định là "video"
      tempParams[paramProperty] = "video";
      tempFilterList[indexList].indexCurrent = 0;
    }

    this.setState({
      filterList: tempFilterList
    });

    // change filter params
    await this.props.changeFilterParams(tempParams);
    // close Filter
    this.filterButton.current.click();
    // save filterList
    this.props.saveFilterList(tempFilterList);
    // call API filter videos
    this.onFilterVideo(this.props.searchValue, this.props.filterParams);
    console.log("this.state.params: ", this.props.filterParams);
  };

  render() {
    const { filterList } = this.state;
    const { theme } = this.context;
    return (
      <FilterWrapper>
        <FilterButton ref={this.filterButton}>
          <IZButton>Filter</IZButton>
        </FilterButton>

        <div ref={this.collapseSection} className="collapse">
          <FilterSectInner>
            <Columns>
              {filterList.length > 0 &&
                filterList.map(filter => (
                  <Columns.Column key={filter.filter}>
                    <SectWrapp>
                      <SectTitle>{filter.filterName}</SectTitle>
                      <SectBody>
                        {filter.filterItems.map((item, index) => {
                          const isActive =
                            filter.indexCurrent === index ? true : false;
                          const isIgnore =
                            item.isIgnore === true ? true : false;
                          // const SectItemClassName = `${isActive} ${isIgnore}`;
                          return (
                            <SectItem
                              key={index + 1}
                              theme={theme}
                              themes={themes}
                              isIgnore={isIgnore}
                              isActive={isActive}
                            >
                              <span
                                className="text"
                                onClick={() =>
                                  this.clickFilter(
                                    item,
                                    filter.indexList,
                                    index
                                  )
                                }
                              >
                                {item.showName}
                              </span>
                              {isActive && (
                                <Button
                                  remove={true}
                                  size="small"
                                  className="close"
                                  onClick={() =>
                                    this.removeFilter(item, filter.indexList)
                                  }
                                ></Button>
                              )}
                            </SectItem>
                          );
                        })}
                      </SectBody>
                    </SectWrapp>
                  </Columns.Column>
                ))}
            </Columns>
          </FilterSectInner>
        </div>
      </FilterWrapper>
    );
  }
}

Filter.contextType = SkinContext;

const mapStateToProps = state => ({
  searchValue: state.searchReducer.searchValue,
  filterParams: state.videosReducer.filterParams,
  isResetFilterList: state.videosReducer.isResetFilterList,
  prevFilterList: state.videosReducer.prevFilterList
});

export default connect(mapStateToProps, {
  changeFilterParams,
  fetchFilterVideos,
  resetFilterList,
  saveFilterList,
  changeLoadingVideoStatus
})(Filter);
