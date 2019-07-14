import React,{ Component } from 'react';
import * as h from '../../helper';

import { 
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

import Videos from '../../apis/videos';

const FilterButton = React.forwardRef((props, ref) => (
    <FilterButtonWrapp ref={ref}>{props.children}</FilterButtonWrapp>
));

class Filter extends Component {

    constructor() {
        super();
        this.filterButton = React.createRef();
        this.collapseSection = React.createRef();
        this.state = {
            videosAPI: new Videos(),
            params: {},
            filterList: [
                {
                    type: 'UPLOAD DATE',
                    items: [
                        'Last hour',
                        'Today',
                        'This week',
                        'This month',
                        'This year'
                    ],
                    indexList: 0,
                    indexCurrent: -1
                },
                {
                    type: 'TYPE',
                    items: [
                        'Video',
                        'Channel',
                        'Playlist',
                        'Movie',
                        'Show'
                    ],
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

    filterVideo = async (search,params) => {
        const { videosAPI } = this.state;
        this.setState({ isLoadingVideo: true });
        await videosAPI.customSearchVideo(search,params);

        this.setState({
            isLoadingVideo: false,
            videos: videosAPI.videos.items
        });
        console.log(this.state.videos);
    }

    clickFilterItem = async (indexList, index) => {
        var tempFilterList = this.state.filterList.splice('');
        tempFilterList[indexList].indexCurrent = index;

        var tempParams = Object.assign({}, this.state.params);
        // get Property + Value
        var paramProperty =  tempFilterList[indexList].type.toLowerCase();
        var paramValue = tempFilterList[indexList].items[index].toLowerCase();
        tempParams[paramProperty] = paramValue;

        await this.setState({ 
            filterList: tempFilterList,
            params: tempParams
        });
        
        this.filterVideo('son tung', this.state.params);
    }

    render() {
        const { filterList } = this.state;
        const sizeFilterCol = parseInt( 12 / filterList.length );

        return(
            <div>
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
                                            
                                            { filter.items.map((item,index) =>
                                                <SectItem 
                                                    key={index + 1} 
                                                    className={ filter.indexCurrent == index ? 'active' : '' }
                                                >
                                                    <span 
                                                        className="text" 
                                                        onClick={() => this.clickFilterItem(filter.indexList, index)}
                                                    >{ item }</span>
                                                </SectItem>
                                            )}

                                        </SectBody>
                                    </SectWrapp>
                                </Columns.Column>
                            ))}

                        </Columns>
                    </FilterSectInner>
                </div>
            </div>
        )
    }
}

export default Filter;