import React,{Component,Fragment} from 'react';
import {
  Row,
  Col,
  Timeline,
  Button,
  Layout,
  Input,
  Modal,
  Card,
  Icon,
  Avatar,
  Spin,
  Popconfirm
} from 'antd';
import {observer} from 'mobx-react';
import {loadAll} from '../../../tool';
import {SpanLH32} from '../../../styled';
import styled from 'styled-components';
const { Meta } = Card;
const HCard=styled(Card)`
  cursor: pointer;
  :hover {
    transform:translate(0,-5px);
    box-shadow:1px 5px 20px #d9d9d9;
  }
`;
@observer(['store'])
export default class GooglePalceCard extends Component{
  streetView=React.createRef();
  state={
    loading:true,
  }
  imgOnload=()=>{
    this.setState({loading:false})
  }

  deletePlace=()=>{
    this.props.store.deletePlace(this.props.data);
  }
  async componentDidMount (){
    // await loadAll();
    // const {
    //   google,
    // }=window;
    // const {
    //   store,
    //   data:d,
    //   data:{
    //     place
    //   },
    // }=this.props;
    // place
    // const sv = new google.maps.StreetViewService();
    // const panorama = new google.maps.StreetViewPanorama(this.streetView.current);
  /*  sv.getPanorama({location: place.geometry.location, radius: 50}, function(data, status){
      if (status === 'OK') {
        console.log(status);
          // var marker = new google.maps.Marker({
          //   position: data.location.latLng,
          //   map: map,
          //   title: data.location.description
          // });

          panorama.setPano(data.location.pano);
          panorama.setPov({
            heading: 270,
            pitch: 0
          });
          panorama.setVisible(true);

          d.marker.addListener('click', function() {
            var markerPanoID = data.location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
              heading: 270,
              pitch: 0
            });
            panorama.setVisible(true);
          });
        } else {
          console.error('Street View data not found for this location.');
        }*/
    // });
  }
  render(){
    const {
      data:{
        place:{
          photos,
          name,
          formatted_address,
          icon,
        }
      },
    }=this.props;
    const src=photos&&photos[0].getUrl();
    const hasPhoto=src?true:false;
    const cover=hasPhoto?
    <Spin spinning={this.state.loading&&hasPhoto}>
      <img
        width={250}
        height={140}
        src={src}
        onLoad={this.imgOnload}
      />
    </Spin>:null;
    return (
      <HCard
        style={{ width: 250, marginTop: 16 }}
        actions={[
          <Icon type="setting" />,
          <Icon type="edit" />,
          <Popconfirm
            title="确认删除此地点？"
            onConfirm={this.deletePlace}
          >
            <Icon type="delete" />
          </Popconfirm>
        ]}
        cover={
          cover
        }
      >
        <Meta
          title={
            <Fragment>
              <img width={16} height={16} src={icon}/>
              {name}
            </Fragment>
          }
          description={formatted_address}
          />
      </HCard>
    )
  }
}