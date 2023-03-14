package com.system.hotel.booking.common;

import com.system.hotel.booking.entity.User;

public class UserAndHotelIdVO {

	private User user;
	private Long hotelId;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getHotelId() {
		return hotelId;
	}

	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}

	public UserAndHotelIdVO convert(User user, Long Id) {
		UserAndHotelIdVO userAndHotelIdVO = new UserAndHotelIdVO();
		userAndHotelIdVO.setHotelId(Id);
		userAndHotelIdVO.setUser(user);
		return userAndHotelIdVO;
	}

}
