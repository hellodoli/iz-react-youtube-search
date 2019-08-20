import React,{ Component } from 'react';

import { Dropdown } from 'react-bulma-components';

import { themesColor } from '../../skin-context';

class DropdownTheme extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dropdownList: Object.values(themesColor),
            selected: themesColor.default.primaryLight
        }
    }

    onChange = selected => {
        this.setState({ selected });
    }

    render() {
        return(
            <Dropdown value={this.state.selected} onChange={this.onChange} {...this.props}>
                { this.state.dropdownList.map(item =>
                    <Dropdown.Item value={item.primaryLight}>{ item.primaryLight }</Dropdown.Item>
                )}
            </Dropdown>
        )
    }
}

export default DropdownTheme;