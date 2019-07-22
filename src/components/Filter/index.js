import React,{ Component } from 'react';
import { connect } from 'react-redux';

import * as h from '../../helper';

import { 
    FilterWrapper,
    FilterButtonWrapp,
    FilterSectInner,
    SectWrapp,
    SectTitle,
    SectBody,
    SectItem
} from './styled';

import {
    Columns,
    Button
} from 'react-bulma-components';

const FilterButton = React.forwardRef((props, ref) => (
    <FilterButtonWrapp ref={ref}>{props.children}</FilterButtonWrapp>
));

class Filter extends Component {

    constructor() {
        super();
        this.filterButton = React.createRef();
        this.collapseSection = React.createRef();
        this.state = {
            prevParams: {},
            params: { type: 'video' },
            filterList: []
        }
    }

    static getDerivedStateFromProps(props,state) {

        if(props.resetFilter) {

            const defaultList = [
                {
                    filter: 'publishedAfter',
                    filterItems: [
                        {
                            showName: 'Last hour',
                            name: '',
                            parent: {list: 1, index: 0},
                            isIgnore: false,
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        },
                        {
                            showName: 'Today',
                            name: '',
                            parent: {list: 1, index: 0},
                            isIgnore: false,
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        },
                        {
                            showName: 'This week',
                            name: '',
                            parent: {list: 1, index: 0},
                            isIgnore: false,
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        },
                        {
                            showName: 'This month',
                            name: '',
                            parent: { list: 1, index: 0 },
                            isIgnore: false,
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        },
                        {
                            showName: 'This year',
                            name: '',
                            parent: { list: 1, index: 0 },
                            isIgnore: false,
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        }
                    ],
                    filterName: 'UPLOAD DATE',
                    indexList: 0,
                    indexCurrent: -1
                },
                {
                    filter: 'type',
                    filterItems: [
                        {
                            showName: 'Video',
                            name: 'video',
                            isIgnore: false,
                            children: [
                                { list: 0, items: [1,1,1,1,1] },
                                { list: 2, items: [1,1] }
                            ]
                        },
                        {
                            showName: 'Chanel',
                            name: 'channel',
                            isIgnore: false,
                            ignore: [
                                { list: 0, items: [1,1,1,1,1] },
                                { list: 2, items: [1,1] }
                            ]
                        },
                        {
                            showName: 'Playlist',
                            name: 'playlist',
                            isIgnore: false,
                            ignore: [
                                { list: 0, items: [1,1,1,1,1] },
                                { list: 2, items: [1,1] }
                            ]
                        }
                    ],
                    filterName: 'TYPE',
                    indexList: 1,
                    indexCurrent: 0
                },
                {
                    filter: 'videoDuration',
                    filterItems: [
                        {
                            showName: 'Short(< 4 minutes)',
                            name: 'short',
                            isIgnore: false,
                            parent: { list: 1, index: 0 },
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        },
                        {
                            showName: 'Long(> 20 minutes)',
                            name: 'long',
                            isIgnore: false,
                            parent: { list: 1, index: 0 },
                            ignore: [
                                { list: 1, items: [0,1,1] }
                            ]
                        }
                    ],
                    filterName: 'DURATION',
                    indexList: 2,
                    indexCurrent: -1
                },
                {
                    filter: 'order',
                    filterItems: [
                        {
                            showName: 'Relevance',
                            name: 'relevance',
                            isIgnore: false
                        },
                        {
                            showName: 'Upload date',
                            name: 'date',
                            isIgnore: false
                        },
                        {
                            showName: 'View count',
                            name: 'viewCount',
                            isIgnore: false
                        },
                        {
                            showName: 'Rating',
                            name: 'rating',
                            isIgnore: false
                        }
                    ],
                    filterName: 'SORT BY',
                    indexList: 3,
                    indexCurrent: -1
                }
            ];

            return {
                filterList: defaultList,
                params: { type: 'video' }
            }
        }
        return null;
    }

    componentDidMount() {
        var filterButton = this.filterButton.current;
        var collapseSection = this.collapseSection.current;
        var height = '';
        filterButton.onclick = function() {
            h.collapse(collapseSection,height);
        };
    }

    resetIgnore = (list) => {
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].filterItems.length; j++) {
                list[i].filterItems[j].isIgnore = false;
            }
        }
    }

    switchIgnore = (tempFilterList, filterItem, type) => {
        for (let i = 0; i < filterItem.ignore.length; i++) {
            var list = filterItem.ignore[i].list;
            for (let j = 0; j < filterItem.ignore[i].items.length; j++) {
                var item = filterItem.ignore[i].items[j];
                if(item === 1) {
                    tempFilterList[list].filterItems[j].isIgnore = type;
                }
            }
        }
    }

    clickFilter = async (filterItems, indexList, index) => {

        await this.props.changeResetFilter();

        var filterItem = filterItems[index];

        // check ignore
        if( filterItem.isIgnore === false ) {
            
            var tempFilterList = this.state.filterList.splice('');

            // active class
            tempFilterList[indexList].indexCurrent = index;

            // filter hour
            var resultDate = '';
            if(tempFilterList[indexList].filter === "publishedAfter") {
                var d = new Date();
  
                var date = d.getDate();
                var month = d.getMonth() + 1;
                var year = d.getFullYear();
                
                var hour = d.getHours();
                var minute = d.getMinutes();
                var second = d.getSeconds();

                function zeroStart() {
                    hour = 0;
                    minute = 0;
                    second = 0;
                }

                switch (filterItem.showName) {
                    case 'Last hour':
                        hour -= 1;
                        if(hour < 0) hour = 23;
                        break;
                    case 'Today':
                        zeroStart();
                        break;
                    case 'This week':
                        var day = d.getDay() - 1;
                        if(day < 0) day = 6;
                        var w = date - day;
                        if(w <= 0) {
                            var prevMonth = month - 1;
                            if(prevMonth === 0) prevMonth = 12;
                            var lastDay = h.checkLastDate(prevMonth,year);
                            w = lastDay + w;
                            month = prevMonth;
                        }
                        date = w;
                        zeroStart();
                        break;
                    case 'This month':
                        date = 1;
                        zeroStart();
                        break;
                    case 'This year':
                        date = 1;
                        month = 1;
                        zeroStart();
                        break;
                    default:
                        break;
                }

                resultDate = year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + second + 'Z';

                filterItem.name = resultDate;
            }

            // turn off Ignore of children
            if( filterItem.children && filterItem.children.length > 0 ) {

                for (let i = 0; i < filterItem.children.length; i++) {
                    var list = filterItem.children[i].list;
                    for (let j = 0; j < filterItem.children[i].items.length; j++) {
                        var item = filterItem.children[i].items[j];
                        if( item === 1 ) {
                            tempFilterList[list].filterItems[j].isIgnore = false;
                        }
                    }
                }
            }

            // reset, turn on Ignore if have Ignore
            if( filterItem.ignore && filterItem.ignore.length > 0 ) {

                //reset Ignore
                this.resetIgnore(tempFilterList);

                // turn on Ignore
                this.switchIgnore(tempFilterList,filterItem,true);
            }

            var tempParams = Object.assign({}, this.state.params);
            // get Property + Value
            var paramProperty = tempFilterList[indexList].filter;
            var paramValue = filterItem.name;
            tempParams[paramProperty] = paramValue;

            await this.setState({
                filterList: tempFilterList,
                params: tempParams
            });

            //close Filter
            this.filterButton.current.click();
            // call API filter videos
            this.props.onFilterVideo(this.props.searchValue, this.state.params);
            console.log(this.state.params);
        }
    }

    removeFilter = async (filterItems, indexList, index) => {

        await this.props.changeResetFilter();

        var tempFilterList = this.state.filterList.splice('');

        // back ignore
        var filterItem = filterItems[index];

        var tempParams = Object.assign({}, this.state.params);
        var paramProperty = tempFilterList[indexList].filter;
        var paramValue = filterItem.name;
        
        if(tempParams[paramProperty] === paramValue) {
            delete tempParams[paramProperty];
        }

        if( filterItem.children && filterItem.children.length > 0 ) {

            var shouldTurnOffActiveParent = false;
            for (let i = 0; i < filterItem.children.length; i++) {

                // tắt thằng cha => nếu thằng con đang active thì không cho tắt
                const list = filterItem.children[i].list;
                const indexChildrenActive = tempFilterList[list].indexCurrent;
                if(filterItem.children[i].items[indexChildrenActive] === 1) {
                    // check thằng active có phải con của list cha hay không
                    // nếu phải thì không cho tắt
                    shouldTurnOffActiveParent = true;
                    break;
                }
            }

            if(!shouldTurnOffActiveParent) {
                // được phép tắt active khi không có thằng con nào đang active
                tempFilterList[indexList].indexCurrent = -1;
            }

        }else {

            if(filterItem.parent) {
                var parent = tempFilterList[filterItem.parent.list].filterItems[filterItem.parent.index];

                // đây là thằng con khi tắt nó thì chưa chắc chắn trả lại ignore
                // => Đi đến thằng cha => kiểm tra nếu số thằng con active = 1 (chính nó) => trả ignore
                
                var activeChild = 0;
                for (let i = 0; i < parent.children.length; i++) {
                    const list = parent.children[i].list;
                    const indexChildrenActive = tempFilterList[list].indexCurrent;
                    if(parent.children[i].items[indexChildrenActive] === 1) {
                        activeChild += 1;
                    }
                }

                if(activeChild === 1) {
                    if( filterItem.ignore && filterItem.ignore.length > 0 ) {
                        this.switchIgnore(tempFilterList,filterItem,false);
                    }
                }
            }else {
                if( filterItem.ignore && filterItem.ignore.length > 0 ) {
                    this.switchIgnore(tempFilterList,filterItem,false);
                }
            }

            // đây là thằng con. Chắc chắn được tắt active
            tempFilterList[indexList].indexCurrent = -1;
        }
        
        //trường hợp đặc biệt
        if(paramProperty === 'type') {
            // nếu tắt filter "type" => trả về filter "type" mặc định là "video"
            tempParams[paramProperty] = 'video';
            tempFilterList[indexList].indexCurrent = 0;
        }
            
        await this.setState({
            filterList: tempFilterList,
            params: tempParams
        });

        //close Filter
        this.filterButton.current.click();
        // call API filter videos
        this.props.onFilterVideo(this.props.searchValue, this.state.params);
        console.log(this.state.params);
    }

    render() {
        const { filterList } = this.state;
        const sizeFilterCol = parseInt( 12 / this.state.filterList.length );
        
        return(
            <FilterWrapper>

                <FilterButton ref={this.filterButton}>
                    <Button color="primary">Filter</Button>
                </FilterButton>

                <div ref={this.collapseSection} className="collapse">
                    <FilterSectInner>
                        <Columns>

                            { filterList.length > 0 && filterList.map(filter => (
                                <Columns.Column size={sizeFilterCol} key={filter.filter}>
                                    <SectWrapp>
                                        <SectTitle>{ filter.filterName }</SectTitle>
                                        <SectBody>
                                            
                                            { filter.filterItems.map((item,index) => {
                                                const isActive = (filter.indexCurrent === index) ? 'active' : '';
                                                const isIgnore = (item.isIgnore === true) ? 'ignore' : '';
                                                const SectItemClassName = `${isActive} ${isIgnore}`;
                                                return(
                                                    <SectItem 
                                                        key={index + 1}
                                                        className= {SectItemClassName}
                                                    >
                                                        <div>
                                                            <span 
                                                                className='text'
                                                                onClick={() => this.clickFilter(filter.filterItems,filter.indexList,index)}
                                                            >{ item.showName }</span>

                                                            { isActive === 'active' &&
                                                                <Button 
                                                                    remove={true} 
                                                                    size="small" 
                                                                    className="close"
                                                                    onClick={() => this.removeFilter(filter.filterItems,filter.indexList,index)}
                                                                ></Button>
                                                            }
                                                            
                                                        </div>
                                                        
                                                    </SectItem>    
                                                )
                                            })}
                                                
                                            
                                        </SectBody>
                                    </SectWrapp>
                                </Columns.Column>
                            ))}

                        </Columns>
                    </FilterSectInner>
                </div>

            </FilterWrapper>
        )
    }
}

const mapStateToProps = state => {
    return{
        searchValue: state.search.changeValueSearchReducer
    }
}

export default connect(mapStateToProps)(Filter);