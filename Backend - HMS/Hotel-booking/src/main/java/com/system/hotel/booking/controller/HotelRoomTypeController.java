package com.system.hotel.booking.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.exception.ResourceNotFoundException;
import com.system.hotel.booking.services.HotelRoomTypeService;
import com.system.hotel.booking.services.HotelService;
import com.system.hotel.booking.utils.ImageUploadDownloadUtil;

@RestController
@CrossOrigin
@RequestMapping("/roomtypes")
public class HotelRoomTypeController {

	@Autowired
	private HotelRoomTypeService hotelRoomTypeService;

	@Autowired
	private HotelService hotelService;

	@PostMapping("hotel/{userId}/create")
	public ResponseEntity<String> createHotelRoomType(@ModelAttribute HotelRoomType hotelRoomType,
			@RequestParam(value = "img", required = false) MultipartFile img, @PathVariable("userId") Long userId)
			throws IOException {
		try {
			Hotel hotel = hotelService.getHotelByUserId(userId);
			hotelRoomType.setHotel(hotel);
			HotelRoomType savedHotelRoomType = hotelRoomTypeService.createHotelRoomType(hotelRoomType);
			savedHotelRoomType.setImage(savedHotelRoomType.getId() + img.getOriginalFilename());
			ImageUploadDownloadUtil imageUploadUtil = new ImageUploadDownloadUtil();
			String imagePath = "RoomType-Images";
			imageUploadUtil.uploadImage(savedHotelRoomType.getId(), img, imagePath);
			hotelRoomTypeService.createHotelRoomType(savedHotelRoomType);
			return ResponseEntity.ok("Room Type Created Successfully");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Failed to create Room Type. " + e.getMessage());
		}
	}

	@GetMapping("/hotel/{hotelId}")
	public ResponseEntity<List<HotelRoomType>> getHotelRoomTypesByHotelId(@PathVariable Long hotelId) {
		try {
			List<HotelRoomType> hotelRoomTypes = hotelRoomTypeService.getHotelRoomTypesByHotelId(hotelId);
			return ResponseEntity.ok(hotelRoomTypes);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/getImage/{img}")
	public ResponseEntity<?> downloadImage(@PathVariable("img") String imgName)
			throws ResourceNotFoundException, IOException, URISyntaxException {
		ImageUploadDownloadUtil downloadUtil = new ImageUploadDownloadUtil();
		String imagePath = "Hotel-Images";
		Resource resource = downloadUtil.getImageAsResource(imgName, imagePath);
		String contentType = "image/png";
		String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, headerValue).body(resource);
	}

}
