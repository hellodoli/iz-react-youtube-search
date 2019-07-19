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
            params: {},
            filterList: [
                {
                    filter: 'type',
                    filterItems: [
                        {
                            showName: 'Video',
                            name: 'video',
                            isIgnore: false
                        },
                        {
                            showName: 'Chanel',
                            name: 'chanel',
                            isIgnore: false,
                            ignore: [
                                { list: 1, items: [1,1] }
                            ]
                        },
                        {
                            showName: 'Playlist',
                            name: 'playlist',
                            isIgnore: false
                        }
                    ],
                    type: 'TYPE',
                    indexList: 0,
                    indexCurrent: -1
                },
                {
                    filter: 'videoDuration',
                    filterItems: [
                        {showName: 'Short(< 4 minutes)', name: 'short', isIgnore: false},
                        {showName: 'Long(> 20 minutes)', name: 'long', isIgnore: false}
                    ],
                    type: 'DURATION',
                    indexList: 1,
                    indexCurrent: -1
                }
            ]
        }
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

    clickFilterItem = async (indexList, index) => {
        var tempFilterList = this.state.filterList.splice('');

        // check ignore
        if( tempFilterList[indexList].filterItems[index].isIgnore == true ) {
            return;
        }
        
        // active class
        tempFilterList[indexList].indexCurrent = index;

        //reset Ignore
        this.resetIgnore(tempFilterList);

        // set ignore
        var filterItem = tempFilterList[indexList].filterItems[index];
        
        if( filterItem.ignore && filterItem.ignore.length > 0 ) {

            for (let i = 0; i < filterItem.ignore.length; i++) {
                var list = filterItem.ignore[i].list;
                for (let j = 0; j < filterItem.ignore[i].items.length; j++) {
                    var item = filterItem.ignore[i].items[j];
                    if( item == 1 ) {
                        tempFilterList[list].filterItems[j].isIgnore = true;
                    }
                }
            }
        }

        var tempParams = Object.assign({}, this.state.params);
        // get Property + Value
        var paramProperty = tempFilterList[indexList].filter;
        var paramValue = tempFilterList[indexList].filterItems[index].name;
        tempParams[paramProperty] = paramValue;

        await this.setState({
            filterList: tempFilterList,
            params: tempParams
        });

        //close Filter
        this.filterButton.current.click();
        // call to filter videos
        this.props.onFilterVideo(this.props.searchValue, this.state.params);
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

                            { filterList.map(filter => (
                                <Columns.Column size={sizeFilterCol} key={filter.type}>
                                    <SectWrapp>
                                        <SectTitle>{ filter.type }</SectTitle>
                                        <SectBody>
                                            
                                            { filter.filterItems.map((item,index) => {
                                                const isActive = filter.indexCurrent === index ? 'active' : '';
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
                                                                onClick={() => this.clickFilterItem(filter.indexList, index)}
                                                            >{ item.showName }</span>

                                                            <Button remove={true} size="small" className="close"></Button>

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

